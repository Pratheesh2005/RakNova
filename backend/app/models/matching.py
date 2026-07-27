from pydantic import BaseModel, Field
from typing import List, Optional

class JobMatchResponse(BaseModel):
    match_percentage: int = Field(..., ge=0, le=100)
    strengths: List[str]
    weaknesses: List[str]
    missing_skills: List[str]
    reasons: List[str]           # Why the match is high/low
    recommended_action: str      # e.g., "Proceed to interview", "Improve resume", etc.
