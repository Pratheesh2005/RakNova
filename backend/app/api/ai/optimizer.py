from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.ai.resume_optimizer_service import resume_optimizer_service
from app.models.ai_response import AIResponse

router = APIRouter()

@router.post("/resume/optimize", response_model=AIResponse)
async def optimize_resume(file: UploadFile = File(...)):
    allowed = (".pdf", ".docx")
    if not file.filename.lower().endswith(allowed):
        raise HTTPException(400, "Only PDF and DOCX files are supported.")
    file_bytes = await file.read()
    result = resume_optimizer_service.execute(file_bytes, file.filename)
    if not result.success:
        error_code = result.error.get("code") if isinstance(result.error, dict) else getattr(result.error, "code", "UNKNOWN")
        error_msg = result.error.get("message") if isinstance(result.error, dict) else getattr(result.error, "message", "Optimization failed.")
        status = 422 if error_code == "INSUFFICIENT_TEXT" else 500
        raise HTTPException(status, error_msg)
    return result
