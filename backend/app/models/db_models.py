import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.db.session import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    role = Column(String, nullable=False)  # "candidate", "company", "recruiter", "admin"
    status = Column(String, default="Active")  # "Active", "Pending Verification", "Suspended"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class CompanyModel(Base):
    __tablename__ = "companies"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    website = Column(String, nullable=True)
    contact_person = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    location = Column(String, nullable=True)
    company_size = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    jobs_posted = Column(Integer, default=0)
    applications_count = Column(Integer, default=0)
    active_recruiters = Column(Integer, default=0)
    verification_status = Column(String, default="Pending Approval")  # "Verified", "Pending Approval", "Rejected"
    company_status = Column(String, default="Active")  # "Active", "Suspended"
    plan = Column(String, default="Free")  # "Free", "Premium", "Enterprise"
    rejection_reason = Column(Text, nullable=True)
    registration_date = Column(String, default=lambda: datetime.date.today().isoformat())

class CandidateModel(Base):
    __tablename__ = "candidates"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    headline = Column(String, nullable=True)
    current_role = Column(String, nullable=True)
    location = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    education = Column(String, nullable=True)
    availability = Column(String, default="Immediate")
    skills = Column(JSON, default=list)
    resume_file_name = Column(String, nullable=True)
    applications_count = Column(Integer, default=0)
    ats_score = Column(Integer, default=0)
    status = Column(String, default="Available")  # "Available", "Active", "Hired", "Suspended"
    registration_date = Column(String, default=lambda: datetime.date.today().isoformat())

class RecruiterModel(Base):
    __tablename__ = "recruiters"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    company_id = Column(String, ForeignKey("companies.id"), nullable=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    department = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    skills = Column(JSON, default=list)
    assigned_company = Column(String, nullable=False)
    assigned_companies = Column(JSON, default=list)
    open_jobs_count = Column(Integer, default=0)
    candidates_managed = Column(Integer, default=0)
    interviews_conducted = Column(Integer, default=0)
    placements_completed = Column(Integer, default=0)
    performance_score = Column(Integer, default=100)
    status = Column(String, default="Active")
    registration_date = Column(String, default=lambda: datetime.date.today().isoformat())

class JobModel(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, index=True)
    company_id = Column(String, ForeignKey("companies.id"), nullable=True)
    company = Column(String, nullable=False)
    title = Column(String, index=True, nullable=False)
    department = Column(String, nullable=True)
    location = Column(String, nullable=True)
    employment_type = Column(String, default="Full-time")
    work_mode = Column(String, default="Hybrid")
    salary_range = Column(String, nullable=True)
    experience_required = Column(String, nullable=True)
    required_skills = Column(JSON, default=list)
    preferred_skills = Column(JSON, default=list)
    description = Column(Text, nullable=True)
    status = Column(String, default="Published")  # "Published", "Draft", "Closed", "Expired"
    applications_count = Column(Integer, default=0)
    views = Column(Integer, default=1)
    recruiters_assigned = Column(Integer, default=1)
    posted_date = Column(String, default=lambda: datetime.date.today().isoformat())
    expiry_date = Column(String, nullable=True)

class ApplicationModel(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True)
    job_id = Column(String, ForeignKey("jobs.id"), nullable=True)
    candidate_id = Column(String, ForeignKey("candidates.id"), nullable=True)
    company_id = Column(String, ForeignKey("companies.id"), nullable=True)
    recruiter_id = Column(String, ForeignKey("recruiters.id"), nullable=True)
    candidate_name = Column(String, nullable=False)
    candidate_email = Column(String, nullable=False)
    candidate_phone = Column(String, nullable=True)
    job_title = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    recruiter_name = Column(String, nullable=True)
    applied_date = Column(String, default=lambda: datetime.date.today().isoformat())
    stage = Column(String, default="Applied")  # "Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"
    match_score = Column(Integer, default=80)
    resume_file_name = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

class InterviewModel(Base):
    __tablename__ = "interviews"

    id = Column(String, primary_key=True, index=True)
    application_id = Column(String, ForeignKey("applications.id"), nullable=False)
    candidate_name = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    job_title = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    interview_type = Column(String, default="Technical Round")
    status = Column(String, default="Scheduled")  # "Scheduled", "Completed", "Cancelled"
    feedback = Column(Text, nullable=True)

class NotificationModel(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    recipient_role = Column(String, nullable=False)  # "Candidate", "Company", "Recruiter", "Super Admin"
    recipient_email = Column(String, nullable=True)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String, default="System")
    priority = Column(String, default="Medium")
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuditLogModel(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
    user_role = Column(String, nullable=False)
    module = Column(String, nullable=False)
    action = Column(String, nullable=False)
    action_type = Column(String, default="System")
    status = Column(String, default="Success")
    ip_address = Column(String, default="127.0.0.1")
    browser = Column(String, default="Chrome")
    operating_system = Column(String, default="Windows")
    details_json = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class AIReportModel(Base):
    __tablename__ = "ai_reports"

    id = Column(String, primary_key=True, index=True)
    candidate_id = Column(String, nullable=False)
    report_type = Column(String, nullable=False)  # "resume", "ats", "skill_gap", "roadmap", "cover_letter"
    score = Column(Integer, default=0)
    content_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class FileModel(Base):
    __tablename__ = "files"

    id = Column(String, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    original_name = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    mime_type = Column(String, nullable=False)
    owner_id = Column(String, nullable=False)
    owner_email = Column(String, nullable=False)
    entity_type = Column(String, default="Resume")  # "Resume", "Logo", "Photo", "OfferLetter", "AIReport"
    entity_id = Column(String, nullable=True)
    file_path = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)
