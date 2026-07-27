from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ...services.ai.skill_gap_service import skill_gap_service
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/analyze", response_model=AIResponse)
async def analyze_skill_gap(
    resume: UploadFile = File(...),
    target_role: str = Form("Full-Stack Software Engineer")
):
    if not resume.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Resume must be PDF or DOCX format.")
    resume_bytes = await resume.read()
    result = skill_gap_service.execute(resume_bytes, resume.filename, target_role)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Skill gap analysis failed")
    return result
