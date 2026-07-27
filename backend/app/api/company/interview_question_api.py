from fastapi import APIRouter, HTTPException
from ...services.ai.company.interview_question_service import interview_question_service
from ...models.company.interview_question_schema import RecruiterInterviewRequest
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/interview-generator", response_model=AIResponse)
async def generate_interview_questions(request: RecruiterInterviewRequest):
    if not request.job_description.strip():
        raise HTTPException(400, "Job description is required.")
    if not request.resume_text.strip():
        raise HTTPException(400, "Candidate resume text is required.")

    result = interview_question_service.execute(request)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Interview question generation failed.")
    return result
