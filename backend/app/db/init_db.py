import datetime
from sqlalchemy.orm import Session
from app.db.session import engine, Base
from app.core.security import hash_password
from app.models.db_models import (
    UserModel, CompanyModel, CandidateModel, RecruiterModel, JobModel,
    ApplicationModel, InterviewModel, NotificationModel, AuditLogModel, AIReportModel, FileModel
)

def init_db(db: Session):
    # Create all tables in database automatically
    Base.metadata.create_all(bind=engine)

    # Seed Admin User if not existing
    admin = db.query(UserModel).filter(UserModel.email == "admin@raknova.com").first()
    if not admin:
        admin_user = UserModel(
            id="usr-106",
            email="admin@raknova.com",
            hashed_password=hash_password("123456"),
            full_name="Super Admin",
            phone="+91 90000 00000",
            role="admin",
            status="Active"
        )
        db.add(admin_user)

    # Seed Candidate User
    candidate_user = db.query(UserModel).filter(UserModel.email == "candidate@raknova.com").first()
    if not candidate_user:
        can_usr = UserModel(
            id="usr-101",
            email="candidate@raknova.com",
            hashed_password=hash_password("123456"),
            full_name="Rohan Nair",
            phone="+91 98765 43210",
            role="candidate",
            status="Active"
        )
        db.add(can_usr)

    # Seed Company User
    company_user = db.query(UserModel).filter(UserModel.email == "company@raknova.com").first()
    if not company_user:
        cmp_usr = UserModel(
            id="usr-103",
            email="company@raknova.com",
            hashed_password=hash_password("123456"),
            full_name="TechCorp Systems",
            phone="+91 80 4123 4567",
            role="company",
            status="Active"
        )
        db.add(cmp_usr)

    # Seed Recruiter User
    recruiter_user = db.query(UserModel).filter(UserModel.email == "recruiter@raknova.com").first()
    if not recruiter_user:
        rec_usr = UserModel(
            id="usr-102",
            email="recruiter@raknova.com",
            hashed_password=hash_password("123456"),
            full_name="Priya Patel",
            phone="+91 98123 45678",
            role="recruiter",
            status="Active"
        )
        db.add(rec_usr)

    # Seed Users
    db.flush()

    # Seed Company
    company = db.query(CompanyModel).filter(CompanyModel.id == "cmp-201").first()
    if not company:
        cmp1 = CompanyModel(
            id="cmp-201",
            name="TechCorp Systems",
            email="company@raknova.com",
            phone="+91 80 4123 4567",
            website="https://techcorp.example.com",
            contact_person="Priya Patel",
            industry="Software & Cloud",
            location="Bangalore, India",
            company_size="500-1000 employees",
            description="Leading enterprise cloud software provider.",
            jobs_posted=42,
            applications_count=1850,
            active_recruiters=12,
            verification_status="Verified",
            company_status="Active",
            plan="Enterprise"
        )
        db.add(cmp1)
        db.flush()

    # Seed Candidate
    candidate = db.query(CandidateModel).filter(CandidateModel.id == "can-401").first()
    if not candidate:
        can1 = CandidateModel(
            id="can-401",
            name="Rohan Nair",
            email="candidate@raknova.com",
            phone="+91 98765 43210",
            headline="Senior Full-Stack Engineer",
            current_role="Senior Developer",
            location="Bangalore, India",
            experience="5+ years",
            education="B.Tech Computer Science",
            availability="Immediate",
            skills=["Python", "FastAPI", "React", "PostgreSQL", "Docker", "AWS"],
            resume_file_name="Rohan_Nair_Resume.pdf",
            applications_count=14,
            ats_score=88,
            status="Available"
        )
        db.add(can1)
        db.flush()

    # Seed Recruiter
    recruiter = db.query(RecruiterModel).filter(RecruiterModel.id == "rec-301").first()
    if not recruiter:
        rec1 = RecruiterModel(
            id="rec-301",
            user_id="usr-102",
            company_id="cmp-201",
            name="Priya Patel",
            email="recruiter@raknova.com",
            phone="+91 98123 45678",
            department="Talent Acquisition",
            experience="4 years",
            assigned_company="TechCorp Systems",
            assigned_companies=["TechCorp Systems"],
            open_jobs_count=5,
            candidates_managed=42,
            interviews_conducted=18,
            placements_completed=12,
            performance_score=95,
            status="Active"
        )
        db.add(rec1)
        db.flush()

    # Seed Job
    job = db.query(JobModel).filter(JobModel.id == "job-501").first()
    if not job:
        job1 = JobModel(
            id="job-501",
            company_id="cmp-201",
            company="TechCorp Systems",
            title="Senior Full-Stack Engineer",
            department="Engineering",
            location="Bangalore, India",
            employment_type="Full-time",
            work_mode="Hybrid",
            salary_range="₹24 - ₹32 LPA",
            experience_required="3-5 years",
            required_skills=["Python", "FastAPI", "React", "PostgreSQL"],
            preferred_skills=["Docker", "AWS"],
            description="Build scalable cloud microservices.",
            status="Published",
            applications_count=184,
            views=1250,
            recruiters_assigned=4
        )
        db.add(job1)
        db.flush()

    # Seed Application
    app_entry = db.query(ApplicationModel).filter(ApplicationModel.id == "APP-901").first()
    if not app_entry:
        app1 = ApplicationModel(
            id="APP-901",
            job_id="job-501",
            candidate_id="can-401",
            company_id="cmp-201",
            recruiter_id="rec-301",
            candidate_name="Rohan Nair",
            candidate_email="candidate@raknova.com",
            candidate_phone="+91 98765 43210",
            job_title="Senior Full-Stack Engineer",
            company_name="TechCorp Systems",
            recruiter_name="Priya Patel",
            stage="Interview",
            match_score=88,
            resume_file_name="Rohan_Nair_Resume.pdf",
            notes="Strong technical profile with FastAPI experience."
        )
        db.add(app1)
        db.flush()

    db.commit()
