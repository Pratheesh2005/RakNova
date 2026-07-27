import fitz
from .base_service import BaseAIService
from ...models.matching import JobMatchResponse
from ...prompts.matching_prompt import JOB_MATCH_PROMPT, JOB_MATCH_SYSTEM
from ...models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ...utils.request_id import generate_request_id
from ...core.logging_config import logger

class JobMatchingService(BaseAIService):
    
    def execute(self, file_bytes: bytes, filename: str, job_description: str) -> AIResponse:
        # 1. Extract resume text
        try:
            resume_text = self._extract_text(file_bytes)
        except Exception as e:
            return self._error("PDF_EXTRACTION_FAILED", str(e))
        
        if not resume_text or len(resume_text.strip()) < 50:
            return self._error("INSUFFICIENT_RESUME_TEXT", "Resume text too short")
        if not job_description or len(job_description.strip()) < 20:
            return self._error("INSUFFICIENT_JOB_TEXT", "Job description too short")
        
        # 2. Call Gemini
        prompt = JOB_MATCH_PROMPT.format(
            resume_text=resume_text,
            job_description=job_description
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=JOB_MATCH_SYSTEM,
                response_schema=JobMatchResponse,
            )
            if response.success:
                validated = JobMatchResponse(**response.data)
                response.data = validated.model_dump()
            return response
        except Exception as e:
            return self._error("AI_SERVICE_ERROR", str(e))
    
    def _extract_text(self, file_bytes: bytes) -> str:
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            return "\n".join([page.get_text() for page in doc]).strip()
    
    def _error(self, code: str, message: str) -> AIResponse:
        req_id = generate_request_id()
        metadata = AIMetadata(
            provider=self.client.provider_name,
            model=self.client.model_name,
            processing_time_ms=0.0,
            request_id=req_id,
        )
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message), metadata=metadata)

job_matching_service = JobMatchingService()
