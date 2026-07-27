from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import (
    UserModel, CompanyModel, CandidateModel, RecruiterModel, JobModel,
    ApplicationModel, NotificationModel, AuditLogModel
)

router = APIRouter()

# --- USERS ENDPOINTS ---
@router.get("/users")
def get_all_users(
    role: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(UserModel)
    if role and role != "All":
        query = query.filter(UserModel.role == role)
    if status and status != "All":
        query = query.filter(UserModel.status == status)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            (UserModel.full_name.ilike(s)) | (UserModel.email.ilike(s))
        )
    users = query.all()
    return {"total": len(users), "users": users}

@router.patch("/users/{user_id}/status")
def update_user_status(user_id: str, new_status: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.status = new_status
    db.commit()
    return {"status": "success", "message": f"User status updated to {new_status}"}

# --- COMPANIES ENDPOINTS ---
@router.get("/companies")
def get_all_companies(
    verification_status: Optional[str] = None,
    company_status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(CompanyModel)
    if verification_status and verification_status != "All":
        query = query.filter(CompanyModel.verification_status == verification_status)
    if company_status and company_status != "All":
        query = query.filter(CompanyModel.company_status == company_status)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(CompanyModel.name.ilike(s))
    companies = query.all()
    return {"total": len(companies), "companies": companies}

@router.post("/companies/{company_id}/approve")
def approve_company(company_id: str, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    company.verification_status = "Verified"
    db.commit()
    return {"status": "success", "message": f"Company {company.name} verified successfully."}

class RejectCompanyPayload(BaseModel):
    reason: str

@router.post("/companies/{company_id}/reject")
def reject_company(company_id: str, payload: RejectCompanyPayload, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).filter(CompanyModel.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    company.verification_status = "Rejected"
    company.rejection_reason = payload.reason
    db.commit()
    return {"status": "success", "message": f"Company {company.name} rejected."}

# --- JOBS ENDPOINTS ---
@router.get("/jobs")
def get_all_jobs(
    status: Optional[str] = None,
    employment_type: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(JobModel)
    if status and status != "All":
        query = query.filter(JobModel.status == status)
    if employment_type and employment_type != "All":
        query = query.filter(JobModel.employment_type == employment_type)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter((JobModel.title.ilike(s)) | (JobModel.company.ilike(s)))
    jobs = query.all()
    return {"total": len(jobs), "jobs": jobs}

class CreateJobPayload(BaseModel):
    company_id: str
    company: str
    title: str
    department: Optional[str] = "Engineering"
    location: Optional[str] = "Bangalore, India"
    employment_type: Optional[str] = "Full-time"
    work_mode: Optional[str] = "Hybrid"
    salary_range: Optional[str] = "₹20 - ₹30 LPA"
    description: str

@router.post("/jobs")
def create_job(payload: CreateJobPayload, db: Session = Depends(get_db)):
    job_id = f"job-{int(db.query(JobModel).count()) + 1000}"
    new_job = JobModel(
        id=job_id,
        company_id=payload.company_id,
        company=payload.company,
        title=payload.title,
        department=payload.department,
        location=payload.location,
        employment_type=payload.employment_type,
        work_mode=payload.work_mode,
        salary_range=payload.salary_range,
        description=payload.description,
        status="Published"
    )
    db.add(new_job)
    db.commit()
    return {"status": "success", "job_id": job_id, "title": payload.title}

# --- APPLICATIONS ENDPOINTS ---
@router.get("/applications")
def get_all_applications(
    stage: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ApplicationModel)
    if stage and stage != "All":
        query = query.filter(ApplicationModel.stage == stage)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            (ApplicationModel.candidate_name.ilike(s)) |
            (ApplicationModel.job_title.ilike(s)) |
            (ApplicationModel.company_name.ilike(s))
        )
    apps = query.all()
    return {"total": len(apps), "applications": apps}

@router.patch("/applications/{app_id}/stage")
def update_application_stage(app_id: str, stage: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.stage = stage
    db.commit()
    return {"status": "success", "message": f"Application stage updated to {stage}"}

# --- NOTIFICATIONS ENDPOINTS ---
@router.get("/notifications")
def get_notifications(role: Optional[str] = "Super Admin", db: Session = Depends(get_db)):
    notifs = db.query(NotificationModel).filter(
        (NotificationModel.recipient_role == role) | (NotificationModel.recipient_role == "All")
    ).all()
    return {"total": len(notifs), "notifications": notifs}

# --- AUDIT LOGS ENDPOINTS ---
@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(AuditLogModel).order_by(AuditLogModel.timestamp.desc()).all()
    return {"total": len(logs), "audit_logs": logs}
