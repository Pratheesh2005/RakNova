from fastapi import APIRouter, HTTPException
from ...services.ai.chat_service import chat_service
from ...models.chat import ChatRequest
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/message", response_model=AIResponse)
async def send_chat_message(request: ChatRequest):
    if not request.messages:
        raise HTTPException(400, "Messages list cannot be empty.")
    result = chat_service.chat(request)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Chat service error")
    return result
