from fastapi import APIRouter, HTTPException
from ..database import supabase

router = APIRouter()

@router.get("/profile", response_model=dict)
async def get_profile(user_id: str):
    """Get a user profile by user ID"""
    try:
        result = supabase.from_("profile") \
            .select("*") \
            .eq("id", user_id) \
            .single() \
            .execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Profile not found")
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/profile", response_model=dict)
async def create_profile(profile: dict):
    """Create a new profile for a user"""
    try:
        result = supabase.from_("profile") \
            .insert(profile) \
            .execute()
        if not result.data:
            raise HTTPException(status_code=400, detail="Failed to create profile")
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))