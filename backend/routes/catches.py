from fastapi import APIRouter, HTTPException, Depends, Query
from bson import ObjectId
from datetime import datetime
from database import get_db
from models import CatchCreate, CatchUpdate
from auth_utils import get_current_user
from typing import Optional

router = APIRouter()


def catch_to_dict(c: dict) -> dict:
    return {
        "id": str(c["_id"]),
        "fishType": c.get("fishType", ""),
        "quantity": c.get("quantity", 0),
        "weight": c.get("weight", 0),
        "location": c.get("location", {}),
        "date": str(c.get("date", datetime.utcnow())),
        "time": c.get("time", ""),
        "userId": c.get("userId", "anonymous"),
        "userName": c.get("userName", "Fisher"),
        "notes": c.get("notes", ""),
        "weather": c.get("weather"),
        "verified": c.get("verified", False),
        "createdAt": str(c.get("createdAt", datetime.utcnow())),
    }


# ─── POST /api/catches ──────────────────────────────────────────────────────────
@router.post("/", status_code=201)
async def create_catch(data: CatchCreate, current_user: dict = Depends(get_current_user)):
    db = get_db()

    catch_doc = {
        "fishType": data.fishType,
        "quantity": data.quantity,
        "weight": data.weight,
        "location": data.location.dict(),
        "date": datetime.utcnow(),
        "time": data.time,
        "userId": str(current_user["_id"]),
        "userName": current_user.get("name", "Fisher"),
        "notes": data.notes or "",
        "weather": data.weather.dict() if data.weather else None,
        "verified": False,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }

    result = await db.catches.insert_one(catch_doc)
    catch_doc["_id"] = result.inserted_id

    # Update user stats
    all_catches = await db.catches.find({"userId": str(current_user["_id"])}).to_list(None)
    unique_fish = list({c["fishType"] for c in all_catches})
    total_weight = sum(c.get("weight", 0) for c in all_catches)

    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {
            "stats.totalCatches": len(all_catches),
            "stats.totalWeight": total_weight,
            "stats.uniqueFishTypes": len(unique_fish),
            "updatedAt": datetime.utcnow()
        }}
    )

    return {
        "success": True,
        "message": "Catch recorded successfully",
        "data": catch_to_dict(catch_doc)
    }


# ─── GET /api/catches ───────────────────────────────────────────────────────────
@router.get("/")
async def get_catches(
    fishType: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    skip: int = Query(0),
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    query = {"userId": str(current_user["_id"])}
    if fishType:
        query["fishType"] = fishType

    cursor = db.catches.find(query).sort("date", -1).skip(skip).limit(limit)
    catches = await cursor.to_list(limit)

    return {
        "success": True,
        "count": len(catches),
        "data": [catch_to_dict(c) for c in catches]
    }


# ─── GET /api/catches/all ───────────────────────────────────────────────────────
@router.get("/all")
async def get_all_catches(
    fishType: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
):
    """Public endpoint - all fishermen's catches (no auth required)."""
    db = get_db()
    query = {}
    if fishType:
        query["fishType"] = fishType

    cursor = db.catches.find(query).sort("date", -1).limit(limit)
    catches = await cursor.to_list(limit)

    return {
        "success": True,
        "count": len(catches),
        "data": [catch_to_dict(c) for c in catches]
    }


# ─── GET /api/catches/stats ─────────────────────────────────────────────────────
@router.get("/stats")
async def get_stats(current_user: dict = Depends(get_current_user)):
    db = get_db()
    pipeline = [
        {"$match": {"userId": str(current_user["_id"])}},
        {"$group": {
            "_id": None,
            "totalCatches": {"$sum": 1},
            "totalQuantity": {"$sum": "$quantity"},
            "totalWeight": {"$sum": "$weight"},
            "avgWeight": {"$avg": "$weight"},
        }}
    ]
    result = await db.catches.aggregate(pipeline).to_list(1)
    stats = result[0] if result else {
        "totalCatches": 0, "totalQuantity": 0,
        "totalWeight": 0, "avgWeight": 0
    }
    stats.pop("_id", None)

    return {"success": True, "data": stats}


# ─── GET /api/catches/{id} ──────────────────────────────────────────────────────
@router.get("/{catch_id}")
async def get_catch(catch_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    try:
        c = await db.catches.find_one({"_id": ObjectId(catch_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid catch ID")

    if not c:
        raise HTTPException(status_code=404, detail="Catch not found")

    return {"success": True, "data": catch_to_dict(c)}


# ─── PUT /api/catches/{id} ──────────────────────────────────────────────────────
@router.put("/{catch_id}")
async def update_catch(catch_id: str, data: CatchUpdate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    try:
        c = await db.catches.find_one({"_id": ObjectId(catch_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid catch ID")

    if not c:
        raise HTTPException(status_code=404, detail="Catch not found")
    if c["userId"] != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="Not authorized to update this catch")

    update_fields = {"updatedAt": datetime.utcnow()}
    if data.fishType is not None:  update_fields["fishType"] = data.fishType
    if data.quantity is not None:  update_fields["quantity"] = data.quantity
    if data.weight is not None:    update_fields["weight"] = data.weight
    if data.notes is not None:     update_fields["notes"] = data.notes

    await db.catches.update_one({"_id": ObjectId(catch_id)}, {"$set": update_fields})
    updated = await db.catches.find_one({"_id": ObjectId(catch_id)})

    return {"success": True, "message": "Catch updated", "data": catch_to_dict(updated)}


# ─── DELETE /api/catches/{id} ───────────────────────────────────────────────────
@router.delete("/{catch_id}")
async def delete_catch(catch_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    try:
        c = await db.catches.find_one({"_id": ObjectId(catch_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid catch ID")

    if not c:
        raise HTTPException(status_code=404, detail="Catch not found")
    if c["userId"] != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="Not authorized to delete this catch")

    await db.catches.delete_one({"_id": ObjectId(catch_id)})

    return {"success": True, "message": "Catch deleted"}
