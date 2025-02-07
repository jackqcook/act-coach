from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Ensure that the .env file is loaded automatically
load_dotenv()

class Settings(BaseSettings):
    # Use the same variable names as in your .env file.
    VITE_SUPABASE_URL: str = os.getenv("VITE_SUPABASE_URL", "")
    VITE_SUPABASE_ANON_KEY: str = os.getenv("VITE_SUPABASE_ANON_KEY", "")

    class Config:
        # Look for the .env file in the current working directory.
        env_file = ".env"
        extra = "allow"

settings = Settings()