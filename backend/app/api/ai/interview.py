import json
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from ...services.ai.interview_service import interview_service
from ...models.ai_response import AIResponse

router = APIRouter()

@router.post("/questions", response_model=AIResponse)
async def generate_questions(
    resume: UploadFile = File(...),
    job_description: str = Form(""),
    interview_type: str = Form("Technical"),
    difficulty: str = Form("Medium"),
    experience: str = Form("Fresher"),
    num_questions: int = Form(5),
    language: str = Form("English")
):
    if not resume.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Resume must be PDF or DOCX format.")
    resume_bytes = await resume.read()
    result = interview_service.generate_questions(
        resume_bytes, resume.filename, job_description,
        interview_type, difficulty, experience, num_questions, language
    )
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Question generation failed")
    return result

@router.post("/evaluate", response_model=AIResponse)
async def evaluate_interview(
    resume_text: str = Form(""),
    interview_type: str = Form("Technical"),
    difficulty: str = Form("Medium"),
    questions_and_answers: str = Form(...) # JSON string
):
    try:
        qa_list = json.loads(questions_and_answers)
    except Exception:
        raise HTTPException(400, "questions_and_answers must be valid JSON array string.")

    result = interview_service.evaluate_answers(resume_text, interview_type, difficulty, qa_list)
    if not result.success:
        raise HTTPException(422, result.error.get("message") if isinstance(result.error, dict) else "Evaluation failed")
    return result
