from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from ...services.ai.job_match_service import job_match_service
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/analyze", response_model=AIResponse)
async def analyze_job_match(
    resume_file: UploadFile = File(...),
    job_description: str = Form(""),           # pasted JD text
    jd_file: Optional[UploadFile] = File(None) # optional JD file
):
    if not resume_file.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Resume must be PDF or DOCX.")
    resume_bytes = await resume_file.read()
    
    jd_bytes = None
    jd_name = None
    if jd_file:
        if not jd_file.filename.lower().endswith(('.pdf', '.docx')):
            raise HTTPException(400, "JD file must be PDF or DOCX.")
        jd_bytes = await jd_file.read()
        jd_name = jd_file.filename
    
    if not job_description.strip() and not jd_bytes:
        raise HTTPException(400, "Provide job description text or upload a JD file.")
    
    result = job_match_service.execute(resume_bytes, resume_file.filename, job_description, jd_bytes, jd_name)
    if not result.success:
        error_code = result.error.get("code", "") if isinstance(result.error, dict) else getattr(result.error, "code", "")
        error_msg = result.error.get("message", "") if isinstance(result.error, dict) else getattr(result.error, "message", "Analysis failed.")
        status = 422 if error_code.startswith("RESUME") or error_code.startswith("JD") else 500
        raise HTTPException(status, error_msg)
    return result
