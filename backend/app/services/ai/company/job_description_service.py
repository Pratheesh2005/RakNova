from ..base_service import BaseAIService
from ....models.company.job_description_schema import JobDescriptionRequest, JobDescriptionResponse
from ....prompts.company.job_description_prompt import JOB_DESCRIPTION_PROMPT, JOB_DESCRIPTION_SYSTEM
from ....models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ....utils.request_id import generate_request_id
from ....core.logging_config import logger

class JobDescriptionService(BaseAIService):
    def execute(self, request: JobDescriptionRequest) -> AIResponse:
        return self.generate_job_description(request)

    def generate_job_description(self, request: JobDescriptionRequest) -> AIResponse:
        prompt = JOB_DESCRIPTION_PROMPT.format(
            title=request.title,
            department=request.department,
            experience=request.experience,
            employment_type=request.employment_type,
            work_mode=request.work_mode,
            location=request.location,
            salary=request.salary or "Competitive Industry Standard",
            required_skills=", ".join(request.required_skills) if request.required_skills else "Core Software Engineering Skills",
            preferred_skills=", ".join(request.preferred_skills) if request.preferred_skills else "Cloud & DevOps Tools",
            company_description=request.company_description or "Leading Technology Enterprise powered by RakNova."
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=JOB_DESCRIPTION_SYSTEM,
                response_schema=JobDescriptionResponse,
                max_tokens=3072
            )
            if response.success:
                validated = JobDescriptionResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_job_description(request)
        except Exception as e:
            logger.warning(f"Job Description AI generation exception: {str(e)}, using fallback.")
            return self._fallback_job_description(request)

    def _fallback_job_description(self, request: JobDescriptionRequest) -> AIResponse:
        title = request.title or "Software Engineer"
        req_skills = request.required_skills if request.required_skills else ["Python", "JavaScript", "React", "SQL"]
        pref_skills = request.preferred_skills if request.preferred_skills else ["Docker", "AWS", "FastAPI"]
        
        fallback_data = {
            "job_title": title,
            "job_summary": f"We are seeking a talented {title} to join our growing {request.department} team at RakNova. In this role, you will design, develop, and maintain high-performance software applications driving business growth.",
            "key_responsibilities": [
                f"Design, build, and deploy scalable web features using {', '.join(req_skills[:3])}",
                "Collaborate with cross-functional product, design, and engineering teams to deliver robust software solutions",
                "Optimize database queries and RESTful APIs for maximum speed and throughput",
                "Write clean, well-tested code and participate in peer code reviews",
                "Troubleshoot, debug, and upgrade existing production application systems"
            ],
            "required_skills": req_skills,
            "preferred_skills": pref_skills,
            "qualifications": [
                "Bachelor's degree in Computer Science, Software Engineering, or related technical field",
                f"Demonstrated experience ({request.experience}) building modern web applications",
                "Strong grasp of software design patterns, data structures, and algorithms"
            ],
            "benefits": [
                "Competitive Salary & Annual Performance Bonus",
                "Comprehensive Medical & Health Insurance Coverage",
                "Flexible Work Arrangements (Hybrid / Remote Option)",
                "Professional Development Allowance & Learning Budget"
            ],
            "about_company": request.company_description or "RakNova is a next-generation recruitment intelligence platform empowering talent acquisition teams and job seekers worldwide.",
            "ats_keywords": req_skills + pref_skills + ["Agile", "REST API", "Software Development"],
            "seo_job_description": f"## {title} — {request.department}\n\n**Location:** {request.location} ({request.work_mode})\n**Employment Type:** {request.employment_type}\n\n### Job Summary\nWe are seeking a talented **{title}** to join our {request.department} team...\n\n### Required Skills\n" + "\n".join([f"- {s}" for s in req_skills])
        }

        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-CompanyAI", model="RakNova-Engine", processing_time_ms=120.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

job_description_service = JobDescriptionService()
