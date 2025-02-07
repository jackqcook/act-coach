from fastapi import APIRouter, HTTPException
from ..models.user import UserCreate, UserLogin, UserResponse
from ..database import supabase

router = APIRouter()

@router.post("/signup", response_model=dict)
async def signup(user: UserCreate):
    """Register a new user"""
    try:
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password
        })
        return response.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    """Login an existing user"""
    try:
        response = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })
        return response.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/logout")
async def logout():
    """Logout the current user"""
    try:
        response = supabase.auth.sign_out()
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))