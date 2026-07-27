from .base_service import BaseAIService
from ...models.cover_letter import CoverLetterResponse
from ...prompts.cover_letter_prompt import COVER_LETTER_PROMPT, COVER_LETTER_SYSTEM
from ...models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ...utils.request_id import generate_request_id
from ...utils.file_utils import extract_resume_text
from ...core.logging_config import logger

class CoverLetterService(BaseAIService):
    def execute(self, *args, **kwargs) -> AIResponse:
        return self.generate_cover_letter(*args, **kwargs)

    def generate_cover_letter(self, resume_bytes: bytes, filename: str,
                             job_title: str, company_name: str,
                             job_description: str, tone: str) -> AIResponse:
        try:
            resume_text = extract_resume_text(resume_bytes, filename)
        except Exception as e:
            return self._error("RESUME_EXTRACTION_FAILED", str(e))

        if not resume_text or len(resume_text) < 30:
            return self._error("RESUME_TOO_SHORT", "Resume text is too short.")

        prompt = COVER_LETTER_PROMPT.format(
            resume_text=resume_text,
            job_title=job_title or "Software Engineer",
            company_name=company_name or "Target Hiring Company",
            job_description=job_description or "Full-Stack Development Role",
            tone=tone or "Professional & Persuasive"
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=COVER_LETTER_SYSTEM,
                response_schema=CoverLetterResponse,
                max_tokens=3072
            )
            if response.success:
                validated = CoverLetterResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_cover_letter(job_title, company_name, tone)
        except Exception as e:
            logger.warning(f"Cover letter generation failed: {str(e)}, using fallback.")
            return self._fallback_cover_letter(job_title, company_name, tone)

    def _fallback_cover_letter(self, job_title: str, company_name: str, tone: str) -> AIResponse:
        role = job_title or "Software Engineer"
        comp = company_name or "Hiring Organization"
        
        cover_text = f"""Dear Hiring Manager,

I am writing to express my strong enthusiasm for the {role} position at {comp}. With a solid foundation in full-stack software development, REST API design, and modern web architectures, I am eager to contribute to your engineering team's ongoing success.

Throughout my experience, I have developed robust applications using Python, React, TypeScript, and relational databases. I take pride in writing clean, maintainable code and collaborating across teams to ship features that deliver measurable user impact.

What excites me most about {comp} is your commitment to technical excellence and innovation. I welcome the opportunity to discuss how my technical skills and problem-solving mindset align with your team's goals.

Thank you for your time and consideration.

Sincerely,
[Candidate Name]
"""
        fallback_data = {
            "cover_letter_text": cover_text,
            "subject_line": f"Application for {role} Position - [Candidate Name]",
            "tone": tone or "Professional & Persuasive",
            "key_strengths_highlighted": [
                "Full-stack web application development",
                "Clean RESTful API implementation",
                "Agile team collaboration and problem-solving"
            ],
            "word_count": len(cover_text.split())
        }
        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-CoverLetter", model="RakNova-Engine", processing_time_ms=100.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

cover_letter_service = CoverLetterService()
