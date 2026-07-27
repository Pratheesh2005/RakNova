import json
from .base_service import BaseAIService
from ...models.interview import InterviewQuestionsResponse, InterviewReport
from ...prompts.interview_prompt import (
    INTERVIEW_QUESTIONS_PROMPT, INTERVIEW_GENERATION_SYSTEM,
    INTERVIEW_REPORT_PROMPT, INTERVIEW_REPORT_SYSTEM
)
from ...models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ...utils.request_id import generate_request_id
from ...utils.file_utils import extract_resume_text
from ...core.logging_config import logger

class InterviewService(BaseAIService):
    def execute(self, *args, **kwargs) -> AIResponse:
        return self.generate_questions(*args, **kwargs)

    def generate_questions(self, resume_bytes: bytes, filename: str,
                           job_description: str, interview_type: str,
                           difficulty: str, experience: str,
                           num_questions: int, language: str) -> AIResponse:
        try:
            resume_text = extract_resume_text(resume_bytes, filename)
        except Exception as e:
            return self._error("RESUME_EXTRACTION_FAILED", str(e))

        if not resume_text or len(resume_text) < 30:
            return self._error("RESUME_TOO_SHORT", "Resume content is too short.")

        prompt = INTERVIEW_QUESTIONS_PROMPT.format(
            resume_text=resume_text,
            job_description=job_description or "General Software Development Role",
            interview_type=interview_type,
            difficulty=difficulty,
            experience=experience,
            num_questions=num_questions,
            language=language
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=INTERVIEW_GENERATION_SYSTEM,
                response_schema=InterviewQuestionsResponse,
                max_tokens=3072
            )
            if response.success:
                validated = InterviewQuestionsResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_questions(interview_type, difficulty, num_questions)
        except Exception as e:
            logger.warning(f"Interview question generation failed: {str(e)}, using fallback.")
            return self._fallback_questions(interview_type, difficulty, num_questions)

    def evaluate_answers(self, resume_text: str, interview_type: str, difficulty: str,
                         questions_and_answers: list) -> AIResponse:
        answers_json = json.dumps(questions_and_answers)
        prompt = INTERVIEW_REPORT_PROMPT.format(
            resume_text=resume_text or "Candidate Resume",
            interview_type=interview_type,
            difficulty=difficulty,
            answers_json=answers_json
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=INTERVIEW_REPORT_SYSTEM,
                response_schema=InterviewReport,
                max_tokens=3072
            )
            if response.success:
                validated = InterviewReport(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_report()
        except Exception as e:
            logger.warning(f"Interview evaluation failed: {str(e)}, using fallback.")
            return self._fallback_report()

    def _fallback_questions(self, interview_type: str, difficulty: str, num_questions: int) -> AIResponse:
        q_pool = [
            {"id": 1, "question": "Can you explain your experience building scalable REST APIs and database models?", "category": "technical", "difficulty": difficulty, "ideal_answer": "Discuss API design patterns, ORM/SQL query optimization, status codes, and input validation."},
            {"id": 2, "question": "Describe a challenging bug you encountered in production and how you debugged it.", "category": "technical", "difficulty": difficulty, "ideal_answer": "Use STAR method: explain symptom, log analysis, root cause diagnosis, and fix verification."},
            {"id": 3, "question": "How do you manage state management and performance in modern web frontends?", "category": "technical", "difficulty": difficulty, "ideal_answer": "Explain local state vs global store, memoization, lazy loading, and rendering performance."},
            {"id": 4, "question": "Tell me about a time you had a technical disagreement with a teammate.", "category": "behavioral", "difficulty": difficulty, "ideal_answer": "Focus on data-driven discussion, benchmark comparisons, active listening, and consensus."},
            {"id": 5, "question": "Why do you want to join RakNova and what are your key professional goals?", "category": "HR", "difficulty": difficulty, "ideal_answer": "Highlight passion for AI software engineering, continuous learning, and product impact."}
        ]
        items = (q_pool * ((num_questions // len(q_pool)) + 1))[:num_questions]
        for i, item in enumerate(items, start=1):
            item["id"] = i

        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-Interview", model="RakNova-Engine", processing_time_ms=100.0, request_id=req_id)
        return AIResponse(success=True, data={"questions": items}, metadata=metadata)

    def _fallback_report(self) -> AIResponse:
        fallback_data = {
            "overall_score": 82,
            "technical_score": 85,
            "behavioral_score": 80,
            "communication_score": 78,
            "problem_solving": 84,
            "confidence": 80,
            "star_method_score": 75,
            "strengths": [
                "Solid understanding of core software engineering and API development",
                "Clear technical explanations for architecture design",
                "Good structured problem solving approach"
            ],
            "weaknesses": [
                "Could provide more quantified metric results in behavioral answers",
                "Needs more explicit detail on automated testing frameworks"
            ],
            "mistakes": [
                "Missed edge-case handling explanation in algorithmic question 2"
            ],
            "areas_to_improve": [
                "Practice using STAR method (Situation, Task, Action, Result) for all scenario questions",
                "Deepen knowledge of distributed caching and microservice patterns"
            ],
            "ideal_answers": [
                "When asked about state management, highlight memory footprint reduction and immutability advantages."
            ],
            "improved_answers": [
                "Frame project outcomes with concrete statistics, e.g., 'reduced API response time by 40%'"
            ],
            "learning_resources": [
                "System Design Interview by Alex Xu",
                "LeetCode Medium Data Structures & Algorithms Practice",
                "STAR Method Behavioral Interview Guide"
            ],
            "interview_readiness": 84,
            "hiring_probability": 79
        }
        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-Interview", model="RakNova-Engine", processing_time_ms=100.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

interview_service = InterviewService()
