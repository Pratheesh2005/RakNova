from .base_service import BaseAIService
from ...models.chat import ChatRequest, ChatResponse
from ...prompts.chat_prompt import CHAT_PROMPT, CHAT_SYSTEM
from ...models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ...utils.request_id import generate_request_id
from ...core.logging_config import logger

class ChatService(BaseAIService):
    def execute(self, request: ChatRequest, *args, **kwargs) -> AIResponse:
        return self.chat(request)

    def chat(self, request: ChatRequest) -> AIResponse:
        history_str = "\n".join([f"{msg.role.upper()}: {msg.content}" for msg in request.messages])
        prompt = CHAT_PROMPT.format(
            resume_text=request.resume_text or "None provided",
            target_role=request.target_role or "Software Engineer",
            chat_history=history_str
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=CHAT_SYSTEM,
                response_schema=ChatResponse,
                max_tokens=2048
            )
            if response.success:
                validated = ChatResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_chat(request)
        except Exception as e:
            logger.warning(f"AI Chat exception: {str(e)}, using fallback.")
            return self._fallback_chat(request)

    def _fallback_chat(self, request: ChatRequest) -> AIResponse:
        last_msg = request.messages[-1].content if request.messages else "Hello"
        reply = f"Thank you for reaching out! Regarding **\"{last_msg}\"**, here are key career recommendations:\n\n1. **ATS Optimization**: Ensure your resume bullet points contain action verbs and quantified impact metrics.\n2. **Skill Alignment**: Focus on high-demand core technologies such as Docker, AWS, and modern full-stack web frameworks.\n3. **Interview Preparation**: Practice system design patterns and STAR-method behavioral questions."
        
        fallback_data = {
            "reply": reply,
            "suggested_followups": [
                "How can I improve my ATS resume score?",
                "What system design questions should I prepare for?",
                "How do I highlight my projects for senior roles?"
            ],
            "relevant_topics": ["ATS Optimization", "Interview Prep", "Career Growth"]
        }
        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-Chat", model="RakNova-Engine", processing_time_ms=100.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

chat_service = ChatService()
