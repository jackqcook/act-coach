from fastapi import APIRouter, HTTPException
from ..models.math_section import MathSection, MathQuestion
from ..database import supabase
from typing import List

router = APIRouter()

@router.get("/math_sections", response_model=dict)


@router.get("/sections/{section_id}/questions", response_model=List[MathQuestion])
async def get_section_questions(section_id: int):
    """Get all questions for a specific math section"""
    try:
        response = supabase.from_("math_question") \
            .select("*") \
            .eq("math_section_id", section_id) \
            .execute()
            
        if not response.data:
            raise HTTPException(status_code=404, detail="No questions found for this section")
            
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
