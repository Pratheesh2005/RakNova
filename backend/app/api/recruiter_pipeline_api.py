import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import (
    ApplicationModel, InterviewModel, RecruiterModel, CandidateModel, JobModel, UserModel, NotificationModel
)
from app.core.security import get_current_user, require_role

router = APIRouter()

class UpdateStagePayload(BaseModel):
    stage: str  # "Applied", "Screening", "Shortlisted", "Interview", "Technical Round", "HR Round", "Offer", "Hired", "Rejected"
    notes: Optional[str] = None

class ScheduleInterviewPayload(BaseModel):
    date: str
    time: str
    interview_type: Optional[str] = "Technical Round"
    meeting_link: Optional[str] = "https://meet.google.com/raknova-recruiter-interview"
    interviewer: Optional[str] = "Senior Tech Lead"

class AddNotePayload(BaseModel):
    note: str

@router.get("/pipeline")
def get_recruiter_pipeline(
    stage: Optional[str] = None,
    job_id: Optional[str] = None,
    search: Optional[str] = None,
    current_user: UserModel = Depends(require_role(["recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(ApplicationModel)

    if current_user.role == "recruiter":
        recruiter = db.query(RecruiterModel).filter(
            (RecruiterModel.user_id == current_user.id) | (RecruiterModel.email == current_user.email)
        ).first()
        if recruiter:
            query = query.filter(
                (ApplicationModel.recruiter_id == recruiter.id) |
                (ApplicationModel.company_name == recruiter.assigned_company)
            )

    if stage and stage != "All":
        query = query.filter(ApplicationModel.stage == stage)

    if job_id and job_id != "All":
        query = query.filter(ApplicationModel.job_id == job_id)

    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            (ApplicationModel.candidate_name.ilike(s)) |
            (ApplicationModel.job_title.ilike(s)) |
            (ApplicationModel.candidate_email.ilike(s))
        )

    apps = query.order_by(ApplicationModel.applied_date.desc()).all()

    # Recruiter Dashboard KPI Metrics
    total_candidates = len(apps)
    in_pipeline = len([a for a in apps if a.stage not in ["Hired", "Rejected", "Withdrawn"]])
    offers_pending = len([a for a in apps if a.stage == "Offer"])
    placements = len([a for a in apps if a.stage == "Hired"])
    interviews_scheduled = len([a for a in apps if a.stage in ["Interview", "Technical Round", "HR Round"]])

    return {
        "metrics": {
            "total_candidates": total_candidates,
            "in_pipeline": in_pipeline,
            "offers_pending": offers_pending,
            "placements": placements,
            "interviews_scheduled": interviews_scheduled
        },
        "applications": apps
    }

@router.patch("/applications/{app_id}/stage")
def update_candidate_stage(
    app_id: str,
    payload: UpdateStagePayload,
    current_user: UserModel = Depends(require_role(["recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found.")

    old_stage = app.stage
    app.stage = payload.stage
    if payload.notes:
        existing_notes = app.notes or ""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        app.notes = f"[{timestamp} - {current_user.full_name}]: {payload.notes}\n" + existing_notes

    # Dispatch Notification to Candidate
    db.add(NotificationModel(
        id=f"notif-{int(db.query(NotificationModel).count()) + 1000}",
        recipient_role="Candidate",
        recipient_email=app.candidate_email,
        title=f"Application Stage Updated: {payload.stage}",
        message=f"Your application for {app.job_title} at {app.company_name} is now in '{payload.stage}' stage.",
        category="Application",
        priority="High" if payload.stage in ["Offer", "Hired"] else "Medium"
    ))

    db.commit()

    return {
        "status": "success",
        "message": f"Candidate {app.candidate_name} moved from '{old_stage}' to '{payload.stage}'.",
        "stage": payload.stage
    }

@router.post("/applications/{app_id}/schedule-interview")
def schedule_candidate_interview(
    app_id: str,
    payload: ScheduleInterviewPayload,
    current_user: UserModel = Depends(require_role(["recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found.")

    app.stage = "Interview"

    int_id = f"int-{int(db.query(InterviewModel).count()) + 1000}"
    new_interview = InterviewModel(
        id=int_id,
        application_id=app.id,
        candidate_name=app.candidate_name,
        company_name=app.company_name,
        job_title=app.job_title,
        date=payload.date,
        time=payload.time,
        interview_type=payload.interview_type or "Technical Round",
        status="Scheduled",
        feedback=f"Interviewer: {payload.interviewer} | Link: {payload.meeting_link}"
    )

    db.add(new_interview)

    # Notify Candidate
    db.add(NotificationModel(
        id=f"notif-{int(db.query(NotificationModel).count()) + 1000}",
        recipient_role="Candidate",
        recipient_email=app.candidate_email,
        title="Interview Scheduled",
        message=f"Interview scheduled for {app.job_title} on {payload.date} at {payload.time}.",
        category="Interview",
        priority="High"
    ))

    db.commit()

    return {
        "status": "success",
        "message": f"Interview scheduled for {app.candidate_name} on {payload.date} at {payload.time}.",
        "interview_id": int_id
    }

@router.post("/applications/{app_id}/add-note")
def add_candidate_note(
    app_id: str,
    payload: AddNotePayload,
    current_user: UserModel = Depends(require_role(["recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found.")

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    new_note_entry = f"[{timestamp} - {current_user.full_name}]: {payload.note}\n"
    app.notes = new_note_entry + (app.notes or "")

    db.commit()
    return {"status": "success", "message": "Note added successfully.", "notes": app.notes}
