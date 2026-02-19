from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_db, close_db
from routes import auth, catches

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()

app = FastAPI(
    title="Fishnet API",
    description="Backend API for the Fishnet fishing app",
    version="2.0.0",
    lifespan=lifespan
)

# CORS - allow React Native app to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(catches.router, prefix="/api/catches", tags=["Catches"])

@app.get("/")
async def root():
    return {"message": "Fishnet API is running 🐟", "version": "2.0.0", "framework": "FastAPI"}

@app.get("/health")
async def health():
    return {"status": "ok"}
