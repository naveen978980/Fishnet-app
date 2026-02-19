from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Example User model (expand as needed)
class User(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    licenseId: Optional[str] = None
    region: Optional[str] = None
    boatName: Optional[str] = None
    experience: Optional[str] = None
    tokens: int = 800

# In-memory user store (replace with DB integration)
users = {}

@app.post("/register")
def register(user: User):
    if user.email in users:
        return {"error": "User already exists"}
    users[user.email] = user
    return {"message": "User registered", "user": user}

@app.post("/login")
def login(email: str):
    user = users.get(email)
    if not user:
        return {"error": "User not found"}
    return {"message": "Login successful", "user": user}

@app.get("/profile/{email}")
def get_profile(email: str):
    user = users.get(email)
    if not user:
        return {"error": "User not found"}
    return user

@app.post("/tokens/earn")
def earn_tokens(email: str, amount: int):
    user = users.get(email)
    if not user:
        return {"error": "User not found"}
    user.tokens += amount
    return {"message": f"{amount} tokens earned", "tokens": user.tokens}

@app.post("/tokens/spend")
def spend_tokens(email: str, amount: int):
    user = users.get(email)
    if not user:
        return {"error": "User not found"}
    if user.tokens < amount:
        return {"error": "Insufficient tokens"}
    user.tokens -= amount
    return {"message": f"{amount} tokens spent", "tokens": user.tokens}

# Add more endpoints as needed for your app
