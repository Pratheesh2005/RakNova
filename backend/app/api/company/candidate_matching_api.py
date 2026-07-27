from fastapi import APIRouter, HTTPException
from ...services.ai.company.candidate_matching_service import candidate_matching_service
from ...models.company.candidate_matching_schema import CandidateMatchingRequest
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/candidate-match", response_model=AIResponse)
async def match_candidates(request: CandidateMatchingRequest):
    if not request.job_description.strip():
        raise HTTPException(400, "Job description is required.")
    if not request.candidates:
        raise HTTPException(400, "At least one candidate resume is required.")

    result = candidate_matching_service.execute(request)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Candidate matching failed.")
    return result
