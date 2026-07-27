from pydantic import BaseModel, Field
from typing import List, Optional

class CoverLetterResponse(BaseModel):
    cover_letter_text: str = Field(..., min_length=50)
    subject_line: str = Field(default="Application for Position")
    tone: str = Field(default="Professional & Persuasive")
    key_strengths_highlighted: List[str] = Field(default_factory=list)
    word_count: int = Field(default=250)
