from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

class Settings(BaseSettings):
    VITE_SUPABASE_URL: str = os.getenv("VITE_SUPABASE_URL", "")
    VITE_SUPABASE_ANON_KEY: str = os.getenv("DATABASE_URL_UNPOOLED", "")

    class Config:
           # Look for the .env file in the current working directory.
        env_file = ".env"
        extra = "allow"

settings = Settings()