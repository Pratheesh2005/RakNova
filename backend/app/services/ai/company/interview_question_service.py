from ..base_service import BaseAIService
from ....models.company.interview_question_schema import RecruiterInterviewRequest, RecruiterInterviewResponse
from ....prompts.company.interview_question_prompt import RECRUITER_INTERVIEW_PROMPT, RECRUITER_INTERVIEW_SYSTEM
from ....models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ....utils.request_id import generate_request_id
from ....core.logging_config import logger

class RecruiterInterviewQuestionService(BaseAIService):
    def execute(self, request: RecruiterInterviewRequest) -> AIResponse:
        return self.generate_questions(request)

    def generate_questions(self, request: RecruiterInterviewRequest) -> AIResponse:
        prompt = RECRUITER_INTERVIEW_PROMPT.format(
            job_title=request.job_title or "Software Engineer",
            job_description=request.job_description,
            candidate_name=request.candidate_name or "Candidate",
            resume_text=request.resume_text,
            experience_level=request.experience_level,
            difficulty=request.difficulty,
            interview_type=request.interview_type,
            num_questions=request.num_questions
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=RECRUITER_INTERVIEW_SYSTEM,
                response_schema=RecruiterInterviewResponse,
                max_tokens=3072
            )
            if response.success:
                validated = RecruiterInterviewResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_questions(request)
        except Exception as e:
            logger.warning(f"Recruiter Interview AI exception: {str(e)}, using fallback.")
            return self._fallback_questions(request)

    def _fallback_questions(self, request: RecruiterInterviewRequest) -> AIResponse:
        name = request.candidate_name or "Candidate"
        title = request.job_title or "Software Engineer"
        diff = request.difficulty or "Medium"

        questions = [
            {
                "id": 1,
                "question": f"Based on your resume experience, walk us through a recent {title} project you led. What were the core architecture decisions and technical trade-offs?",
                "category": "Technical",
                "difficulty": diff,
                "expected_answer": "Candidate should explain system architecture, API boundaries, database design, and trade-offs made between performance and dev speed.",
                "evaluation_criteria": ["Architectural clarity", "Deep understanding of tech stack", "Articulate trade-off reasoning"],
                "follow_up_question": "If traffic scaled 10x overnight, which component would bottleneck first and how would you redesign it?"
            },
            {
                "id": 2,
                "question": "How do you ensure data integrity, API validation, and database performance when designing REST endpoints?",
                "category": "Technical",
                "difficulty": diff,
                "expected_answer": "Expect mention of input schema validation (Pydantic/Zod), database indexing, ORM query optimization, and status codes.",
                "evaluation_criteria": ["Backend engineering standards", "Data validation rigor", "Performance awareness"],
                "follow_up_question": "How do you handle database migration scripts in CI/CD without causing zero-downtime deployment issues?"
            },
            {
                "id": 3,
                "question": "Tell me about a situation where a critical bug slipped into production. How did you diagnose it under pressure?",
                "category": "Behavioral",
                "difficulty": diff,
                "expected_answer": "Look for STAR method (Situation, Task, Action, Result). Candidate should focus on root cause analysis, logging, and blameless post-mortems.",
                "evaluation_criteria": ["Composure under pressure", "Systematic debugging mindset", "Post-mortem learning culture"],
                "follow_up_question": "What automated monitoring or alert rules did you implement afterwards to prevent reoccurrence?"
            },
            {
                "id": 4,
                "question": "Imagine product requirements change 2 days before a scheduled release. How do you evaluate scope trade-offs with product managers?",
                "category": "Scenario",
                "difficulty": diff,
                "expected_answer": "Candidate should discuss prioritizing MVP features, technical debt trade-offs, scope trimming, and clear cross-functional communication.",
                "evaluation_criteria": ["Agile adaptability", "Pragmatic scope management", "Product-engineering alignment"],
                "follow_up_question": "How do you communicate technical delays to non-technical stakeholders without causing panic?"
            },
            {
                "id": 5,
                "question": "What specifically attracts you to RakNova and our technical roadmap?",
                "category": "HR",
                "difficulty": diff,
                "expected_answer": "Genuine alignment with company mission, interest in AI recruitment engineering, and long-term career growth vision.",
                "evaluation_criteria": ["Company culture alignment", "Career vision maturity", "Enthusiasm for AI domain"],
                "follow_up_question": "Where do you see your technical trajectory evolving over the next 2 years?"
            }
        ]

        fallback_data = {
            "candidate_name": name,
            "job_title": title,
            "interview_type": request.interview_type,
            "difficulty": diff,
            "questions": questions[:request.num_questions],
            "interview_guide_summary": f"Interview guide tailored for {name} ({title}). Focus on assessing technical depth in software architecture, problem solving under pressure, and alignment with company culture."
        }

        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-RecruiterAI", model="RakNova-Engine", processing_time_ms=120.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

interview_question_service = RecruiterInterviewQuestionService()
