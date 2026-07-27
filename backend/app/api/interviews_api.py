import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import (
    InterviewModel, ApplicationModel, UserModel, NotificationModel, CompanyModel, CandidateModel
)
from app.core.security import get_current_user, require_role

router = APIRouter()

class CreateInterviewPayload(BaseModel):
    application_id: str
    date: str
    time: str
    interview_type: Optional[str] = "Technical Round"
    meeting_link: Optional[str] = "https://meet.google.com/raknova-tech-interview"
    interviewer: Optional[str] = "Senior Engineering Manager"
    notes: Optional[str] = None

class RescheduleInterviewPayload(BaseModel):
    date: str
    time: str
    reason: Optional[str] = None

class SubmitFeedbackPayload(BaseModel):
    rating: int  # 1 to 5
    technical_skills: int
    communication: int
    problem_solving: int
    culture_fit: int
    comments: str
    recommendation: str  # "Hire", "Hold", "Reject"

@router.get("/interviews")
def get_interviews(
    status: Optional[str] = None,
    interview_type: Optional[str] = None,
    search: Optional[str] = None,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(InterviewModel)

    if current_user.role == "candidate":
        query = query.filter(
            (InterviewModel.candidate_name == current_user.full_name)
        )
    elif current_user.role == "company":
        company = db.query(CompanyModel).filter(
            (CompanyModel.user_id == current_user.id) | (CompanyModel.email == current_user.email)
        ).first()
        company_name = company.name if company else (current_user.companyName or "TechCorp Systems")
        query = query.filter(InterviewModel.company_name == company_name)

    if status and status != "All":
        query = query.filter(InterviewModel.status == status)

    if interview_type and interview_type != "All":
        query = query.filter(InterviewModel.interview_type == interview_type)

    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            (InterviewModel.candidate_name.ilike(s)) |
            (InterviewModel.job_title.ilike(s)) |
            (InterviewModel.company_name.ilike(s))
        )

    interviews = query.order_by(InterviewModel.date.desc()).all()

    # Dashboard Summary Metrics
    total = len(interviews)
    today = datetime.date.today().isoformat()
    todays_interviews = len([i for i in interviews if i.date == today])
    upcoming = len([i for i in interviews if i.status in ["Scheduled", "Confirmed"]])
    completed = len([i for i in interviews if i.status == "Completed"])
    cancelled = len([i for i in interviews if i.status == "Cancelled"])

    return {
        "metrics": {
            "total_interviews": total,
            "todays_interviews": todays_interviews,
            "upcoming": upcoming,
            "completed": completed,
            "cancelled": cancelled
        },
        "interviews": interviews
    }

@router.post("/interviews")
def schedule_new_interview(
    payload: CreateInterviewPayload,
    current_user: UserModel = Depends(require_role(["company", "recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == payload.application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application record not found.")

    int_id = f"int-{int(db.query(InterviewModel).count()) + 1000}"
    new_int = InterviewModel(
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

    app.stage = "Interview"
    db.add(new_int)

    # Notify Candidate
    db.add(NotificationModel(
        id=f"notif-{int(db.query(NotificationModel).count()) + 1000}",
        recipient_role="Candidate",
        recipient_email=app.candidate_email,
        title="Interview Invitation",
        message=f"Interview scheduled for {app.job_title} at {app.company_name} on {payload.date} at {payload.time}.",
        category="Interview",
        priority="High"
    ))

    db.commit()

    return {
        "status": "success",
        "message": f"Interview scheduled for {app.candidate_name} on {payload.date} at {payload.time}.",
        "interview_id": int_id
    }

@router.patch("/interviews/{int_id}/reschedule")
def reschedule_interview(
    int_id: str,
    payload: RescheduleInterviewPayload,
    current_user: UserModel = Depends(require_role(["company", "recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    interview = db.query(InterviewModel).filter(InterviewModel.id == int_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")

    interview.date = payload.date
    interview.time = payload.time
    interview.status = "Scheduled"

    db.commit()
    return {"status": "success", "message": f"Interview rescheduled to {payload.date} at {payload.time}."}

@router.post("/interviews/{int_id}/feedback")
def submit_interview_feedback(
    int_id: str,
    payload: SubmitFeedbackPayload,
    current_user: UserModel = Depends(require_role(["company", "recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    interview = db.query(InterviewModel).filter(InterviewModel.id == int_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")

    interview.status = "Completed"
    interview.feedback = (
        f"Rating: {payload.rating}/5 | Tech: {payload.technical_skills}/5 | "
        f"Comm: {payload.communication}/5 | Problem Solving: {payload.problem_solving}/5 | "
        f"Recommendation: {payload.recommendation}\nComments: {payload.comments}"
    )

    app = db.query(ApplicationModel).filter(ApplicationModel.id == interview.application_id).first()
    if app:
        if payload.recommendation == "Hire":
            app.stage = "Offer"
        elif payload.recommendation == "Reject":
            app.stage = "Rejected"

    db.commit()

    return {
        "status": "success",
        "message": f"Feedback submitted. Candidate recommendation: '{payload.recommendation}'.",
        "recommendation": payload.recommendation
    }

@router.patch("/interviews/{int_id}/cancel")
def cancel_interview(
    int_id: str,
    current_user: UserModel = Depends(require_role(["company", "recruiter", "admin"])),
    db: Session = Depends(get_db)
):
    interview = db.query(InterviewModel).filter(InterviewModel.id == int_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")

    interview.status = "Cancelled"
    db.commit()
    return {"status": "success", "message": f"Interview cancelled."}
