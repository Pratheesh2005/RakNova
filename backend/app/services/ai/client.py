import time
from typing import Any
from .providers.base_provider import BaseAIProvider
from .providers.gemini_provider import GeminiProvider
from ...core.config import settings
from ...core.logging_config import logger
from ...utils.request_id import generate_request_id
from ...models.ai_response import AIResponse, AIMetadata, AIErrorDetail

class AIClient:
    """
    Provider-agnostic AI client. Routes calls to the configured provider,
    adds metadata, logging, and error handling.
    """
    def __init__(self):
        self.provider = self._init_provider()
        self.provider_name = settings.AI_PROVIDER
        self.model_name = getattr(self.provider, 'model', settings.GEMINI_MODEL)
    
    def _init_provider(self) -> BaseAIProvider:
        if settings.AI_PROVIDER == "gemini":
            return GeminiProvider()
        # Future: elif settings.AI_PROVIDER == "openai": return OpenAIProvider()
        raise ValueError(f"Unsupported AI provider: {settings.AI_PROVIDER}")

    def generate(
        self,
        prompt: str,
        system_instruction: str = None,
        temperature: float = 0.3,
        max_tokens: int = 2048,
        response_schema: Any = None,
    ) -> AIResponse:
        request_id = generate_request_id()
        start_time = time.time()
        try:
            data = self.provider.generate(
                prompt=prompt,
                system_instruction=system_instruction,
                temperature=temperature,
                max_tokens=max_tokens,
                response_schema=response_schema,
            )
            elapsed = (time.time() - start_time) * 1000  # ms
            metadata = AIMetadata(
                provider=self.provider_name,
                model=self.model_name,
                processing_time_ms=round(elapsed, 2),
                request_id=request_id,
            )
            logger.info(
                f"AI request {request_id} succeeded | "
                f"provider={self.provider_name} model={self.model_name} "
                f"time={elapsed:.2f}ms"
            )
            return AIResponse(success=True, data=data, metadata=metadata)
        except Exception as e:
            elapsed = (time.time() - start_time) * 1000
            metadata = AIMetadata(
                provider=self.provider_name,
                model=self.model_name,
                processing_time_ms=round(elapsed, 2),
                request_id=request_id,
            )
            error_detail = AIErrorDetail(
                code="AI_PROVIDER_ERROR",
                message=str(e),
            )
            logger.error(
                f"AI request {request_id} failed | "
                f"error={str(e)} | time={elapsed:.2f}ms"
            )
            return AIResponse(success=False, error=error_detail.dict(), metadata=metadata)

# Global client instance
ai_client = AIClient()
