from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ...services.ai.cover_letter_service import cover_letter_service
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/generate", response_model=AIResponse)
async def generate_cover_letter(
    resume: UploadFile = File(...),
    job_title: str = Form("Software Engineer"),
    company_name: str = Form("Tech Company"),
    job_description: str = Form(""),
    tone: str = Form("Professional & Persuasive")
):
    if not resume.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Resume must be PDF or DOCX format.")
    resume_bytes = await resume.read()
    result = cover_letter_service.generate_cover_letter(
        resume_bytes, resume.filename, job_title, company_name, job_description, tone
    )
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Cover letter generation failed")
    return result
