import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import (
    JobModel, ApplicationModel, CandidateModel, CompanyModel, UserModel, NotificationModel
)
from app.core.security import get_current_user, require_role

router = APIRouter()

class ApplyJobPayload(BaseModel):
    job_id: str
    resume_file_name: Optional[str] = "Candidate_Resume.pdf"
    cover_letter: Optional[str] = None
    notes: Optional[str] = None

@router.get("/jobs")
def search_candidate_jobs(
    search: Optional[str] = None,
    work_mode: Optional[str] = None,
    employment_type: Optional[str] = None,
    experience: Optional[str] = None,
    sort_by: Optional[str] = "newest",
    db: Session = Depends(get_db)
):
    query = db.query(JobModel).filter(JobModel.status == "Published")

    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            (JobModel.title.ilike(s)) |
            (JobModel.company.ilike(s)) |
            (JobModel.location.ilike(s))
        )

    if work_mode and work_mode != "All":
        query = query.filter(JobModel.work_mode == work_mode)

    if employment_type and employment_type != "All":
        query = query.filter(JobModel.employment_type == employment_type)

    if experience and experience != "All":
        query = query.filter(JobModel.experience_required == experience)

    if sort_by == "newest":
        query = query.order_by(JobModel.posted_date.desc())
    elif sort_by == "oldest":
        query = query.order_by(JobModel.posted_date.asc())
    elif sort_by == "title":
        query = query.order_by(JobModel.title.asc())

    jobs = query.all()
    return {"total": len(jobs), "jobs": jobs}

@router.post("/applications/apply")
def apply_to_job(
    payload: ApplyJobPayload,
    current_user: UserModel = Depends(require_role(["candidate", "admin"])),
    db: Session = Depends(get_db)
):
    job = db.query(JobModel).filter(JobModel.id == payload.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found.")

    candidate = db.query(CandidateModel).filter(
        (CandidateModel.user_id == current_user.id) | (CandidateModel.email == current_user.email)
    ).first()

    candidate_id = candidate.id if candidate else "can-401"
    candidate_name = candidate.name if candidate else current_user.full_name
    candidate_email = candidate.email if candidate else current_user.email

    # Check for duplicate application
    existing_app = db.query(ApplicationModel).filter(
        ApplicationModel.job_id == payload.job_id,
        ApplicationModel.candidate_id == candidate_id
    ).first()

    if existing_app:
        raise HTTPException(status_code=400, detail="You have already applied for this position.")

    app_id = f"APP-{int(db.query(ApplicationModel).count()) + 1000}"
    new_app = ApplicationModel(
        id=app_id,
        job_id=job.id,
        candidate_id=candidate_id,
        company_id=job.company_id or "cmp-201",
        recruiter_id="rec-301",
        candidate_name=candidate_name,
        candidate_email=candidate_email,
        candidate_phone=current_user.phone or "+91 98765 43210",
        job_title=job.title,
        company_name=job.company,
        recruiter_name="Priya Patel",
        stage="Applied",
        match_score=88,
        resume_file_name=payload.resume_file_name,
        notes=payload.notes or "Applied via Candidate Portal"
    )

    db.add(new_app)

    # Increment Job & Candidate counts
    job.applications_count = (job.applications_count or 0) + 1
    if candidate:
        candidate.applications_count = (candidate.applications_count or 0) + 1

    # Dispatch Notifications
    db.add(NotificationModel(
        id=f"notif-{int(db.query(NotificationModel).count()) + 1000}",
        recipient_role="Candidate",
        recipient_email=candidate_email,
        title="Application Received",
        message=f"Application for '{job.title}' at {job.company} successfully submitted.",
        category="Application",
        priority="Medium"
    ))

    db.add(NotificationModel(
        id=f"notif-{int(db.query(NotificationModel).count()) + 1001}",
        recipient_role="Company",
        title="New Applicant",
        message=f"{candidate_name} applied for '{job.title}'.",
        category="Application",
        priority="Medium"
    ))

    db.commit()

    return {
        "status": "success",
        "message": f"Successfully applied for '{job.title}'!",
        "application_id": app_id
    }

@router.get("/my-applications")
def get_my_applications(
    current_user: UserModel = Depends(require_role(["candidate", "admin"])),
    db: Session = Depends(get_db)
):
    candidate = db.query(CandidateModel).filter(
        (CandidateModel.user_id == current_user.id) | (CandidateModel.email == current_user.email)
    ).first()

    query = db.query(ApplicationModel)
    if candidate:
        query = query.filter(ApplicationModel.candidate_id == candidate.id)
    else:
        query = query.filter(ApplicationModel.candidate_email == current_user.email)

    apps = query.order_by(ApplicationModel.applied_date.desc()).all()

    # Live Dashboard Stats
    total_applied = len(apps)
    under_review = len([a for a in apps if a.stage in ["Applied", "Screening"]])
    interviews = len([a for a in apps if a.stage == "Interview"])
    offers = len([a for a in apps if a.stage in ["Offer", "Hired"]])

    return {
        "metrics": {
            "total_applied": total_applied,
            "under_review": under_review,
            "interviews": interviews,
            "offers": offers
        },
        "applications": apps
    }

@router.delete("/applications/{app_id}/withdraw")
def withdraw_application(
    app_id: str,
    current_user: UserModel = Depends(require_role(["candidate", "admin"])),
    db: Session = Depends(get_db)
):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found.")

    app.stage = "Withdrawn"
    db.commit()
    return {"status": "success", "message": "Application withdrawn successfully."}
