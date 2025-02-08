from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
import os

# Load environment variables
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not SUPABASE_JWT_SECRET:
    raise ValueError("Missing SUPABASE_JWT_SECRET environment variable")

# Convert the JWT secret to bytes to satisfy the type checker
JWT_SECRET = SUPABASE_JWT_SECRET.encode('utf-8')

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        token = credentials.credentials
        print("Received token:", token)  # Debug log
        print("Using JWT secret:", JWT_SECRET[:10], "...")  # Debug log (showing first 10 chars)
        
        decoded_token = jwt.decode(
            token, 
            JWT_SECRET,
            algorithms=["HS256"],
            options={
                "verify_signature": True,
                "verify_aud": False  # Don't verify audience claim
            }
        )
        print("Successfully decoded token:", decoded_token)  # Debug log
        return decoded_token
    except jwt.ExpiredSignatureError:
        print("Token expired")  # Debug log
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print("Invalid token error:", str(e))  # Debug log
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print("Unexpected error:", str(e))  # Debug log
        raise HTTPException(status_code=401, detail=str(e))
