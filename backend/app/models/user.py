from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    """Model for user registration data"""
    email: EmailStr  # Validates email format
    password: str

class UserLogin(BaseModel):
    """Model for user login data"""
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    """Model for user profile data"""
    id: str
    first_name: str
    last_name: str
    username: str
    profile_completed: bool = False

class UserResponse(BaseModel):
    """Model for API responses containing user data"""
    id: str
    email: str
    profile: UserProfile | None = None