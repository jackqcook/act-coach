from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List

class UserCreate(BaseModel):
    """Model for user registration data"""
    email: EmailStr  # Validates email format
    password: str

class MathQuestion(BaseModel):
    math_question_id: int
    test_id: int
    math_section_id: int
    created_at: datetime
    image_url: str | None
    question: str
    answer_a: str
    answer_b: str
    answer_c: str
    answer_d: str
    answer: str


class MathSection(BaseModel):
    section_id: int
    test_id: int
    difficulty: int
    num_questions: int
    created_at: datetime
    questions: List[MathQuestion] = []
