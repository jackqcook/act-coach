from supabase import create_client, Client
from .config import settings

# Create a single Supabase client instance
supabase: Client = create_client(
    settings.VITE_SUPABASE_URL,
    settings.VITE_SUPABASE_ANON_KEY
)

# Test function with auth
def test_connection(auth_token: str | None = None):
    try:
        # If we have an auth token, set it
        if auth_token:
            supabase.auth.set_session(auth_token)
        
        response = supabase.from_("math_sections").select("*").execute()
        print("Connection test response:", response)
        return response
    except Exception as e:
        print("Connection test error:", str(e))
        return None