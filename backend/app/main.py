from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import SessionLocal
from app.db.init_db import init_db

# Import API Routers
from app.api import (
    auth_api, admin_api, company_jobs_api, candidate_jobs_api,
    recruiter_pipeline_api, interviews_api, notifications_api, analytics_api, files_api
)
from app.api.ai import (
    health, resume, ats, matching, job_match_analyzer,
    interview, skill_gap, roadmap, cover_letter, chat,
    optimizer
)
from app.api.company import (
    job_description_api,
    candidate_matching_api,
    interview_question_api
)

app = FastAPI(
    title="RakNova Enterprise Engine",
    description="Production-ready AI & Database services for recruitment intelligence, company portal, file management, and super admin platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:[0-9]+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

# Auth, Admin, Company, Candidate, Recruiter, Interview, Notification, Analytics & Files Routers (PostgreSQL ORM Driven)
app.include_router(auth_api.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(admin_api.router, prefix="/api/v1/admin", tags=["Super Admin Management"])
app.include_router(company_jobs_api.router, prefix="/api/v1/company", tags=["Company Job Management"])
app.include_router(candidate_jobs_api.router, prefix="/api/v1/candidate", tags=["Candidate Job Discovery & Applications"])
app.include_router(recruiter_pipeline_api.router, prefix="/api/v1/recruiter", tags=["Recruiter Hiring Pipeline"])
app.include_router(interviews_api.router, prefix="/api/v1/interviews", tags=["Interview Management & Scheduling"])
app.include_router(notifications_api.router, prefix="/api/v1/notifications", tags=["Notification System"])
app.include_router(analytics_api.router, prefix="/api/v1/analytics", tags=["Live Dashboard Analytics"])
app.include_router(files_api.router, prefix="/api/v1/files", tags=["File & Document Management"])

# Candidate AI Services
app.include_router(health.router, prefix="/api/v1/ai", tags=["Health"])
app.include_router(resume.router, prefix="/api/v1/ai", tags=["Resume"])
app.include_router(ats.router, prefix="/api/v1/ai", tags=["ATS"])
app.include_router(matching.router, prefix="/api/v1/ai", tags=["Job Matching"])
app.include_router(job_match_analyzer.router, prefix="/api/v1/ai/job-match", tags=["Job Match Analysis"])
app.include_router(interview.router, prefix="/api/v1/ai/interview", tags=["Interview"])
app.include_router(skill_gap.router, prefix="/api/v1/ai/skill-gap", tags=["Skill Gap"])
app.include_router(roadmap.router, prefix="/api/v1/ai/roadmap", tags=["Roadmap"])
app.include_router(cover_letter.router, prefix="/api/v1/ai/cover-letter", tags=["Cover Letter"])
app.include_router(chat.router, prefix="/api/v1/ai/chat", tags=["Chat"])
app.include_router(optimizer.router, prefix="/api/v1/ai", tags=["ATS Optimizer"])

# Company Portal AI Features
app.include_router(job_description_api.router, prefix="/api/v1/company/ai", tags=["Company Job Description AI"])
app.include_router(candidate_matching_api.router, prefix="/api/v1/company/ai", tags=["Company Candidate Matching AI"])
app.include_router(interview_question_api.router, prefix="/api/v1/company/ai", tags=["Company Interview Generator AI"])

@app.get("/")
async def root():
    return {"message": "RakNova Enterprise Engine is running", "database": "SQLAlchemy ORM (PostgreSQL Ready)", "version": "1.0.0"}
