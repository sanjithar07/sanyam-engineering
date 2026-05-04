from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ.get('JWT_SECRET', 'sanyam-engineering-secret-key-CHANGE-ME')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@sanyamengineering.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'SanyamAdmin@2026')

app = FastAPI(title="Sanyam Engineering API")

# ✅ CORS must be added RIGHT HERE — before anything else
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://satin-winner-flammable.ngrok-free.dev",  # 👈 update this when ngrok URL changes
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")
security = HTTPBearer()


# ---------- Models ----------
class QuoteCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    company: Optional[str] = Field(None, max_length=160)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=30)
    industry: Optional[str] = Field(None, max_length=80)
    message: str = Field(..., min_length=5, max_length=4000)


class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    email: str
    phone: str
    industry: Optional[str] = None
    message: str
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class QuoteStatusUpdate(BaseModel):
    status: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
    email: str


# ---------- Auth helpers ----------
def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def verify_admin(creds: HTTPAuthorizationCredentials = Depends(security)) -> str:
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=["HS256"])
        email = payload.get("sub")
        if email != ADMIN_EMAIL:
            raise HTTPException(status_code=401, detail="Invalid admin")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"service": "Sanyam Engineering API", "status": "ok"}


@api_router.post("/quotes", response_model=Quote)
async def create_quote(input: QuoteCreate):
    q = Quote(**input.model_dump())
    await db.quotes.insert_one(q.model_dump())
    return q


# ---------- Admin routes ----------
@api_router.post("/admin/login", response_model=LoginResponse)
async def admin_login(req: LoginRequest):
    if req.email.lower() != ADMIN_EMAIL.lower():
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if req.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(ADMIN_EMAIL)
    return LoginResponse(token=token, email=ADMIN_EMAIL)


@api_router.get("/admin/me")
async def admin_me(email: str = Depends(verify_admin)):
    return {"email": email}


@api_router.get("/admin/quotes", response_model=List[Quote])
async def list_quotes(_: str = Depends(verify_admin)):
    docs = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/admin/quotes/{quote_id}", response_model=Quote)
async def update_quote(quote_id: str, update: QuoteStatusUpdate, _: str = Depends(verify_admin)):
    if update.status not in ("new", "contacted", "closed"):
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.quotes.find_one_and_update(
        {"id": quote_id},
        {"$set": {"status": update.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not res:
        raise HTTPException(status_code=404, detail="Quote not found")
    return res


@api_router.delete("/admin/quotes/{quote_id}")
async def delete_quote(quote_id: str, _: str = Depends(verify_admin)):
    res = await db.quotes.delete_one({"id": quote_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"deleted": True}


@api_router.get("/admin/stats")
async def stats(_: str = Depends(verify_admin)):
    total = await db.quotes.count_documents({})
    new = await db.quotes.count_documents({"status": "new"})
    contacted = await db.quotes.count_documents({"status": "contacted"})
    closed = await db.quotes.count_documents({"status": "closed"})
    return {"total": total, "new": new, "contacted": contacted, "closed": closed}


# ✅ Router included AFTER middleware
app.include_router(api_router)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()