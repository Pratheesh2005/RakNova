from fastapi import APIRouter, Form, HTTPException
from ...services.ai.roadmap_service import roadmap_service
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/generate", response_model=AIResponse)
async def generate_roadmap(
    target_goal: str = Form("Senior Full-Stack Engineer"),
    current_level: str = Form("Junior Developer"),
    timeframe: str = Form("6 Months")
):
    if not target_goal.strip():
        raise HTTPException(400, "Target goal is required.")

    result = roadmap_service.generate_roadmap(target_goal, current_level, timeframe)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Roadmap generation failed")
    return result
