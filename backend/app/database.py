from supabase import create_client, Client  # type: ignore
from .config import settings

# Create a single Supabase client instance
supabase: Client = create_client(
    settings.VITE_SUPABASE_URL,
    settings.VITE_SUPABASE_ANON_KEY
)