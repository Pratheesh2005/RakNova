from .base_service import BaseAIService
from ...models.roadmap import CareerRoadmapResponse
from ...prompts.roadmap_prompt import ROADMAP_PROMPT, ROADMAP_SYSTEM
from ...models.ai_response import AIResponse, AIErrorDetail, AIMetadata
from ...utils.request_id import generate_request_id
from ...core.logging_config import logger

class RoadmapService(BaseAIService):
    def execute(self, target_goal: str = "", current_level: str = "", timeframe: str = "", *args, **kwargs) -> AIResponse:
        return self.generate_roadmap(target_goal, current_level, timeframe)

    def generate_roadmap(self, target_goal: str, current_level: str, timeframe: str) -> AIResponse:
        prompt = ROADMAP_PROMPT.format(
            target_goal=target_goal or "Senior Full-Stack Engineer",
            current_level=current_level or "Junior Developer",
            timeframe=timeframe or "6 Months"
        )
        try:
            response = self._generate(
                prompt=prompt,
                system_instruction=ROADMAP_SYSTEM,
                response_schema=CareerRoadmapResponse,
                max_tokens=3072
            )
            if response.success:
                validated = CareerRoadmapResponse(**response.data)
                response.data = validated.model_dump()
                return response
            else:
                return self._fallback_roadmap(target_goal, current_level, timeframe)
        except Exception as e:
            logger.warning(f"Roadmap generation failed: {str(e)}, using fallback.")
            return self._fallback_roadmap(target_goal, current_level, timeframe)

    def _fallback_roadmap(self, target_goal: str, current_level: str, timeframe: str) -> AIResponse:
        fallback_data = {
            "target_goal": target_goal or "Senior Full-Stack Engineer",
            "current_level": current_level or "Junior Developer",
            "timeline": timeframe or "6 Months",
            "overview": f"A comprehensive roadmap to transition from {current_level or 'Junior'} to {target_goal or 'Senior Engineer'} within {timeframe or '6 months'}.",
            "stages": [
                {
                    "step": 1,
                    "stage_name": "Foundational Mastery & Advanced Language Patterns",
                    "duration": "Month 1",
                    "key_focus": "Deepen understanding of asynchronous programming, design patterns, and type systems.",
                    "skills_to_master": ["TypeScript Generics", "Python Asyncio", "Design Patterns (Factory, Strategy, Observer)"],
                    "action_items": ["Refactor existing codebase using clean architecture and SOLID principles", "Implement strict static typing and automated linting"],
                    "suggested_project": "Build an Async Job Queue Engine in Python/Node.js"
                },
                {
                    "step": 2,
                    "stage_name": "Cloud Infrastructure & Containerization",
                    "duration": "Months 2-3",
                    "key_focus": "Master Docker containerization, CI/CD automated deployments, and AWS core services.",
                    "skills_to_master": ["Docker Multi-Stage Builds", "GitHub Actions CI/CD", "AWS ECS & S3 Integration"],
                    "action_items": ["Create automated deployment pipeline for frontend & backend microservices", "Configure environment secrets & IAM role policies"],
                    "suggested_project": "Deploy containerized full-stack web application on AWS ECS"
                },
                {
                    "step": 3,
                    "stage_name": "Database Tuning, Microservices & System Design",
                    "duration": "Months 4-5",
                    "key_focus": "Optimize relational database queries, implement Redis caching, and design high-availability systems.",
                    "skills_to_master": ["PostgreSQL Query Optimization", "Redis Pub/Sub & Caching", "System Architecture & Load Balancing"],
                    "action_items": ["Benchmark API response latency before and after database indexing", "Design scalable multi-tenant database schema"],
                    "suggested_project": "High-Throughput Analytics Dashboard with Redis Cache Layer"
                },
                {
                    "step": 4,
                    "stage_name": "Leadership, Portfolio & Senior Interview Preparation",
                    "duration": "Month 6",
                    "key_focus": "Code review standards, system design interviews, and high-impact resume optimization.",
                    "skills_to_master": ["System Design Interviews", "Technical Mentorship", "Executive Resume Positioning"],
                    "action_items": ["Conduct 5+ mock system design interviews", "Publish open-source project documentation"],
                    "suggested_project": "Production-Ready Open Source SaaS Repository"
                }
            ],
            "career_milestones": [
                "Achieve 85%+ score on AI Job Match for Senior roles",
                "Complete 3 production-grade portfolio projects with Docker & AWS deployments",
                "Successfully pass technical System Design interview rounds"
            ]
        }
        req_id = generate_request_id()
        metadata = AIMetadata(provider="RakNova-Roadmap", model="RakNova-Engine", processing_time_ms=100.0, request_id=req_id)
        return AIResponse(success=True, data=fallback_data, metadata=metadata)

    def _error(self, code, message):
        req_id = generate_request_id()
        metadata = AIMetadata(provider=self.client.provider_name, model=self.client.model_name, processing_time_ms=0.0, request_id=req_id)
        return AIResponse(success=False, error=AIErrorDetail(code=code, message=message).model_dump(), metadata=metadata)

roadmap_service = RoadmapService()
