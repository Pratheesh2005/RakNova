from fastapi import APIRouter, HTTPException
from app.core.config import settings
from app.models.health import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Verify connectivity and configuration of the AI engine."""
    if not settings.gemini_configured:
        raise HTTPException(status_code=503, detail="AI Provider not configured. GEMINI_API_KEY is missing.")
    return HealthResponse(status="healthy", version="1.0.0")
