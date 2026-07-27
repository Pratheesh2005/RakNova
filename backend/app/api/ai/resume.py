from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.ai.resume_service import resume_analysis_service
from app.models.ai_response import AIResponse

router = APIRouter()

@router.post("/resume/analyze", response_model=AIResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Analyze a resume PDF and return structured AI insights.
    """
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    # Read file bytes
    file_bytes = await file.read()
    
    # Call service
    result = resume_analysis_service.execute(file_bytes, file.filename)
    
    # If service returned an error, raise HTTP exception with appropriate status
    if not result.success:
        error_code = result.error.get("code") if isinstance(result.error, dict) else "UNKNOWN"
        error_message = result.error.get("message") if isinstance(result.error, dict) else "Unknown error"
        status_code = 422 if error_code == "INSUFFICIENT_TEXT" else 500
        raise HTTPException(status_code=status_code, detail=error_message)
    
    return result
