import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import JobModel, CompanyModel, UserModel, ApplicationModel
from app.core.security import get_current_user, require_role

router = APIRouter()

class JobCreatePayload(BaseModel):
    title: str
    department: Optional[str] = "Engineering"
    employment_type: Optional[str] = "Full-time"
    work_mode: Optional[str] = "Hybrid"
    location: Optional[str] = "Bangalore, India"
    experience_required: Optional[str] = "3-5 years"
    salary_range: Optional[str] = "₹20 - ₹30 LPA"
    openings: Optional[int] = 1
    expiry_date: Optional[str] = None
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    description: str
    status: Optional[str] = "Published"  # "Published", "Draft", "Closed", "Archived"

class JobUpdatePayload(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    employment_type: Optional[str] = None
    work_mode: Optional[str] = None
    location: Optional[str] = None
    experience_required: Optional[str] = None
    salary_range: Optional[str] = None
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    description: Optional[str] = None
    status: Optional[str] = None
    expiry_date: Optional[str] = None

@router.get("/jobs")
def get_company_jobs(
    status: Optional[str] = None,
    search: Optional[str] = None,
    current_user: UserModel = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(JobModel)

    if current_user.role == "company":
        company = db.query(CompanyModel).filter(
            (CompanyModel.user_id == current_user.id) | (CompanyModel.email == current_user.email)
        ).first()
        if company:
            query = query.filter(JobModel.company_id == company.id)

    if status and status != "All":
        query = query.filter(JobModel.status == status)

    if search:
        s = f"%{search.lower()}%"
        query = query.filter((JobModel.title.ilike(s)) | (JobModel.location.ilike(s)))

    jobs = query.order_by(JobModel.posted_date.desc()).all()

    # Dashboard Summary Metrics
    total_jobs = len(jobs)
    active_jobs = len([j for j in jobs if j.status == "Published"])
    closed_jobs = len([j for j in jobs if j.status == "Closed"])
    draft_jobs = len([j for j in jobs if j.status == "Draft"])
    total_applications = sum([j.applications_count for j in jobs])

    return {
        "metrics": {
            "total_jobs": total_jobs,
            "active_jobs": active_jobs,
            "closed_jobs": closed_jobs,
            "draft_jobs": draft_jobs,
            "total_applications": total_applications
        },
        "jobs": jobs
    }

@router.post("/jobs")
def create_company_job(
    payload: JobCreatePayload,
    current_user: UserModel = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    company = db.query(CompanyModel).filter(
        (CompanyModel.user_id == current_user.id) | (CompanyModel.email == current_user.email)
    ).first()

    company_id = company.id if company else "cmp-201"
    company_name = company.name if company else (current_user.companyName or "TechCorp Systems")

    job_id = f"job-{int(db.query(JobModel).count()) + 1000}"
    new_job = JobModel(
        id=job_id,
        company_id=company_id,
        company=company_name,
        title=payload.title,
        department=payload.department,
        location=payload.location,
        employment_type=payload.employment_type,
        work_mode=payload.work_mode,
        salary_range=payload.salary_range,
        experience_required=payload.experience_required,
        required_skills=payload.required_skills,
        preferred_skills=payload.preferred_skills,
        description=payload.description,
        status=payload.status or "Published",
        applications_count=0,
        views=1,
        posted_date=datetime.date.today().isoformat(),
        expiry_date=payload.expiry_date
    )

    db.add(new_job)

    # Increment company job count
    if company:
        company.jobs_posted = (company.jobs_posted or 0) + 1

    db.commit()

    return {
        "status": "success",
        "message": f"Job '{payload.title}' created successfully.",
        "job_id": job_id
    }

@router.patch("/jobs/{job_id}")
def update_company_job(
    job_id: str,
    payload: JobUpdatePayload,
    current_user: UserModel = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if payload.title: job.title = payload.title
    if payload.department: job.department = payload.department
    if payload.employment_type: job.employment_type = payload.employment_type
    if payload.work_mode: job.work_mode = payload.work_mode
    if payload.location: job.location = payload.location
    if payload.experience_required: job.experience_required = payload.experience_required
    if payload.salary_range: job.salary_range = payload.salary_range
    if payload.required_skills is not None: job.required_skills = payload.required_skills
    if payload.preferred_skills is not None: job.preferred_skills = payload.preferred_skills
    if payload.description: job.description = payload.description
    if payload.status: job.status = payload.status
    if payload.expiry_date: job.expiry_date = payload.expiry_date

    db.commit()
    return {"status": "success", "message": f"Job '{job.title}' updated successfully."}

@router.post("/jobs/{job_id}/duplicate")
def duplicate_company_job(
    job_id: str,
    current_user: UserModel = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    new_id = f"job-{int(db.query(JobModel).count()) + 1000}"
    duplicated_job = JobModel(
        id=new_id,
        company_id=job.company_id,
        company=job.company,
        title=f"{job.title} (Copy)",
        department=job.department,
        location=job.location,
        employment_type=job.employment_type,
        work_mode=job.work_mode,
        salary_range=job.salary_range,
        experience_required=job.experience_required,
        required_skills=job.required_skills,
        preferred_skills=job.preferred_skills,
        description=job.description,
        status="Draft",
        applications_count=0,
        views=1,
        posted_date=datetime.date.today().isoformat()
    )

    db.add(duplicated_job)
    db.commit()
    return {"status": "success", "message": f"Duplicated as '{duplicated_job.title}'", "job_id": new_id}

@router.delete("/jobs/{job_id}")
def delete_company_job(
    job_id: str,
    current_user: UserModel = Depends(require_role(["company", "admin"])),
    db: Session = Depends(get_db)
):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    title = job.title
    db.delete(job)
    db.commit()
    return {"status": "success", "message": f"Job '{title}' permanently deleted."}
