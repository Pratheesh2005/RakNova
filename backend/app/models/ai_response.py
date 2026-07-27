from pydantic import BaseModel, Field
from typing import Any, Optional

class AIMetadata(BaseModel):
    provider: str
    model: str
    processing_time_ms: float
    request_id: str = Field(default="")

class AIResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    metadata: AIMetadata
    error: Optional[dict] = None

class AIErrorDetail(BaseModel):
    code: str
    message: str

class AIErrorResponse(BaseModel):
    success: bool = False
    error: AIErrorDetail
    metadata: AIMetadata
