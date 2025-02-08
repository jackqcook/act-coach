from fastapi import APIRouter, HTTPException, Depends
from ..models.math_section import MathSection, MathQuestion
from ..database import supabase
from typing import List
from ..auth.verify_token import verify_token
from pydantic import BaseModel
from supabase import create_client
from ..config import settings

router = APIRouter()

class MathSectionResponse(BaseModel):
    section_id: int
    test_id: int
    difficulty: int | None  # Make nullable to match database
    num_questions: int
    created_at: str  # Keep as str since that's how it comes from the database

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

@router.get("/sections", response_model=List[MathSectionResponse])
async def get_all_math_sections(user = Depends(verify_token)):
    """Get all available math section ids"""
    try:
        print("Authenticated user:", user)
        print("Attempting to query math_sections with user role:", user.get('role'))
        
        # Get the original token from the request headers
        token = user.get('session_id')  # Get the session ID from the verified token
        
        try:
            # Try to get data with the global supabase client
            response = supabase.from_("math_sections") \
                .select("section_id, test_id, difficulty, num_questions, created_at") \
                .execute()
            
            print("Query executed successfully")
            print("Raw response data:", response.data)
            
            if response.data:
                return response.data
            
            # If no data, try with service role key
            service_client = create_client(
                settings.VITE_SUPABASE_URL,
                settings.VITE_SUPABASE_ANON_KEY
            )
            
            service_response = service_client.from_("math_sections") \
                .select("section_id, test_id, difficulty, num_questions, created_at") \
                .execute()
                
            print("Service client response:", service_response.data)
            return service_response.data
            
        except Exception as query_error:
            print("Query execution failed:", str(query_error))
            raise HTTPException(status_code=500, detail=f"Database query failed: {str(query_error)}")
        
    except Exception as e:
        print("Error type:", type(e))
        print("Error details:", str(e))
        raise HTTPException(status_code=500, detail=str(e))