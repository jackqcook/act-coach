from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client # type: ignore
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Health check route
@app.get("/")
async def read_root():
    return {"status": "healthy"}

# Example route to fetch data from Supabase
@app.get("/items")
async def get_items():
    try:
        response = supabase.table('items').select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Example route to create an item
@app.post("/items")
async def create_item(item: dict):
    try:
        response = supabase.table('items').insert(item).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))