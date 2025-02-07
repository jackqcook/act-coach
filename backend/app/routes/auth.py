from fastapi import APIRouter, HTTPException
from ..models.user import UserCreate, UserLogin
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
        return response.model_dump()
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
        return response.model_dump()
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


@router.get("/verify")
async def verify_token():
    """Verify the current user's token"""
    try:
        session = supabase.auth.get_session()
        if session.session:
            return {
                "user": {
                    "id": session.session.user.id,
                    "email": session.session.user.email
                },
                "message": "Token is valid"
            }
        raise HTTPException(status_code=401, detail="No valid session found")
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))