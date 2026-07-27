from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.ai.ats_service import ats_service
from app.models.ai_response import AIResponse

router = APIRouter()

@router.post("/ats/analyze", response_model=AIResponse)
async def analyze_ats(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(400, "Only PDF files are supported.")
    if not job_description.strip():
        raise HTTPException(400, "Job description cannot be empty.")
    
    file_bytes = await file.read()
    result = ats_service.execute(file_bytes, file.filename, job_description)
    if not result.success:
        error_code = result.error.get("code") if isinstance(result.error, dict) else (result.error.code if hasattr(result.error, 'code') else "UNKNOWN")
        error_msg = result.error.get("message") if isinstance(result.error, dict) else (result.error.message if hasattr(result.error, 'message') else "Error")
        raise HTTPException(422 if error_code == "INSUFFICIENT_RESUME_TEXT" else 500, error_msg)
    return result
