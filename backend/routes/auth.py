from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from datetime import datetime
from database import get_db
from models import (
    UserRegister, UserLogin, UserUpdate,
    PasswordChange, TokenTransaction
)
from auth_utils import (
    hash_password, verify_password,
    create_access_token, get_current_user
)

router = APIRouter()


def user_to_dict(user: dict) -> dict:
    """Convert MongoDB user document to clean profile dict."""
    return {
        "id": str(user["_id"]),
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "phone": user.get("phone", ""),
        "licenseId": user.get("licenseId", ""),
        "region": user.get("region", "Tamil Nadu Coast"),
        "boatName": user.get("boatName", ""),
        "experience": user.get("experience", 0),
        "profilePhoto": user.get("profilePhoto", ""),
        "tokens": user.get("tokens", 800),
        "role": user.get("role", "fisherman"),
        "stats": user.get("stats", {"totalCatches": 0, "totalWeight": 0, "uniqueFishTypes": 0}),
        "createdAt": str(user.get("createdAt", datetime.utcnow())),
    }


# ─── POST /api/auth/register ────────────────────────────────────────────────────
@router.post("/register", status_code=201)
async def register(data: UserRegister):
    db = get_db()

    if not data.name or not data.email or not data.password:
        raise HTTPException(status_code=400, detail="Please provide name, email, and password")

    # Check email uniqueness
    if await db.users.find_one({"email": data.email.lower()}):
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Check license uniqueness
    license_id = data.licenseId or f"TN-FSH-{int(datetime.utcnow().timestamp() * 1000)}"
    if data.licenseId and await db.users.find_one({"licenseId": data.licenseId}):
        raise HTTPException(status_code=400, detail="License ID already registered")

    user_doc = {
        "name": data.name,
        "email": data.email.lower(),
        "password": hash_password(data.password),
        "phone": data.phone or "",
        "licenseId": license_id,
        "region": data.region or "Tamil Nadu Coast",
        "boatName": data.boatName or "",
        "experience": data.experience or 0,
        "profilePhoto": data.profilePhoto or "",
        "tokens": 800,
        "role": "fisherman",
        "verified": False,
        "active": True,
        "stats": {"totalCatches": 0, "totalWeight": 0, "uniqueFishTypes": 0},
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }

    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    token = create_access_token(str(result.inserted_id))

    return {
        "success": True,
        "message": "User registered successfully",
        "data": {"token": token, "user": user_to_dict(user_doc)}
    }


# ─── POST /api/auth/login ───────────────────────────────────────────────────────
@router.post("/login")
async def login(data: UserLogin):
    db = get_db()

    if not data.email or not data.password:
        raise HTTPException(status_code=400, detail="Please provide email and password")

    user = await db.users.find_one({"email": data.email.lower()})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.get("active", True):
        raise HTTPException(status_code=401, detail="Account is deactivated. Please contact support.")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(str(user["_id"]))

    return {
        "success": True,
        "message": "Login successful",
        "data": {"token": token, "user": user_to_dict(user)}
    }


# ─── GET /api/auth/me ───────────────────────────────────────────────────────────
@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {"success": True, "data": user_to_dict(current_user)}


# ─── PUT /api/auth/me ───────────────────────────────────────────────────────────
@router.put("/me")
async def update_me(data: UserUpdate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    user_id = current_user["_id"]

    update_fields = {}
    if data.name is not None:         update_fields["name"] = data.name
    if data.phone is not None:        update_fields["phone"] = data.phone
    if data.region is not None:       update_fields["region"] = data.region
    if data.boatName is not None:     update_fields["boatName"] = data.boatName
    if data.experience is not None:   update_fields["experience"] = data.experience
    if data.profilePhoto is not None: update_fields["profilePhoto"] = data.profilePhoto

    # License ID uniqueness check
    if data.licenseId is not None and data.licenseId != current_user.get("licenseId"):
        existing = await db.users.find_one({"licenseId": data.licenseId, "_id": {"$ne": user_id}})
        if existing:
            raise HTTPException(status_code=400, detail="License ID already in use")
        update_fields["licenseId"] = data.licenseId

    update_fields["updatedAt"] = datetime.utcnow()

    await db.users.update_one({"_id": user_id}, {"$set": update_fields})
    updated_user = await db.users.find_one({"_id": user_id})

    return {
        "success": True,
        "message": "Profile updated successfully",
        "data": {"user": user_to_dict(updated_user)}
    }


# ─── PUT /api/auth/password ─────────────────────────────────────────────────────
@router.put("/password")
async def change_password(data: PasswordChange, current_user: dict = Depends(get_current_user)):
    db = get_db()

    if not verify_password(data.currentPassword, current_user["password"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"password": hash_password(data.newPassword), "updatedAt": datetime.utcnow()}}
    )

    return {"success": True, "message": "Password changed successfully"}


# ─── POST /api/auth/logout ──────────────────────────────────────────────────────
@router.post("/logout")
async def logout():
    return {"success": True, "message": "Logout successful. Please remove token from client."}


# ─── POST /api/auth/tokens/spend ────────────────────────────────────────────────
@router.post("/tokens/spend")
async def spend_tokens(data: TokenTransaction, current_user: dict = Depends(get_current_user)):
    db = get_db()
    current_tokens = current_user.get("tokens", 800)

    if current_tokens < data.amount:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Insufficient tokens",
                "currentTokens": current_tokens,
                "required": data.amount
            }
        )

    new_balance = current_tokens - data.amount
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"tokens": new_balance, "updatedAt": datetime.utcnow()}}
    )

    return {
        "success": True,
        "message": f"{data.amount} tokens spent for {data.reason}",
        "tokens": new_balance
    }


# ─── POST /api/auth/tokens/earn ─────────────────────────────────────────────────
@router.post("/tokens/earn")
async def earn_tokens(data: TokenTransaction, current_user: dict = Depends(get_current_user)):
    db = get_db()
    new_balance = current_user.get("tokens", 800) + data.amount

    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"tokens": new_balance, "updatedAt": datetime.utcnow()}}
    )

    return {
        "success": True,
        "message": f"{data.amount} tokens earned for {data.reason}",
        "tokens": new_balance
    }
