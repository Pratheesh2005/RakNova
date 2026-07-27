from fastapi import APIRouter, HTTPException
from ...services.ai.company.job_description_service import job_description_service
from ...models.company.job_description_schema import JobDescriptionRequest
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/job-description", response_model=AIResponse)
async def generate_job_description(request: JobDescriptionRequest):
    if not request.title.strip():
        raise HTTPException(400, "Job title is required.")
    result = job_description_service.execute(request)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Job description generation failed.")
    return result
