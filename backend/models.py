from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ─── User Models ───────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = ""
    licenseId: Optional[str] = None
    region: Optional[str] = "Tamil Nadu Coast"
    boatName: Optional[str] = ""
    experience: Optional[int] = 0
    profilePhoto: Optional[str] = ""


class UserLogin(BaseModel):
    email: str
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    licenseId: Optional[str] = None
    region: Optional[str] = None
    boatName: Optional[str] = None
    experience: Optional[int] = None
    profilePhoto: Optional[str] = None


class PasswordChange(BaseModel):
    currentPassword: str
    newPassword: str


class TokenTransaction(BaseModel):
    amount: int
    reason: str


# ─── Catch Models ──────────────────────────────────────────────────────────────

class Location(BaseModel):
    latitude: float
    longitude: float
    address: Optional[str] = ""


class WeatherInfo(BaseModel):
    temperature: Optional[float] = None
    condition: Optional[str] = None
    windSpeed: Optional[float] = None


class CatchCreate(BaseModel):
    fishType: str
    quantity: float
    weight: float
    location: Location
    time: str
    userId: Optional[str] = "anonymous"
    userName: Optional[str] = "Fisher"
    notes: Optional[str] = ""
    weather: Optional[WeatherInfo] = None


class CatchUpdate(BaseModel):
    fishType: Optional[str] = None
    quantity: Optional[float] = None
    weight: Optional[float] = None
    notes: Optional[str] = None
