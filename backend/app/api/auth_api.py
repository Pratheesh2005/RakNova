from typing import Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import UserModel, CandidateModel, CompanyModel, RecruiterModel
from app.core.security import (
    hash_password, verify_password, create_access_token, create_refresh_token,
    decode_token, get_current_user
)

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "candidate" | "company" | "recruiter"
    company_name: Optional[str] = None
    phone: Optional[str] = None

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None

@router.post("/login")
def login_user(payload: LoginRequest, db: Session = Depends(get_db)):
    email_clean = payload.email.lower().strip()
    user = db.query(UserModel).filter(UserModel.email == email_clean).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if user.status == "Pending Verification":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account is currently Pending Approval by Super Admin."
        )

    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.id})

    return {
        "status": "success",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role,
            "status": user.status,
            "phone": user.phone
        }
    }

@router.post("/register")
def register_user(payload: RegisterRequest, db: Session = Depends(get_db)):
    email_clean = payload.email.lower().strip()
    if not email_clean or "@" not in email_clean:
        raise HTTPException(status_code=400, detail="Invalid email address provided.")

    existing = db.query(UserModel).filter(UserModel.email == email_clean).first()
    if existing:
        raise HTTPException(status_code=400, detail="Account with this email already exists.")

    try:
        unique_suffix = uuid.uuid4().hex[:6]
        user_id = f"usr-{int(db.query(UserModel).count()) + 1000}-{unique_suffix}"
        hashed_pwd = hash_password(payload.password)

        new_user = UserModel(
            id=user_id,
            email=email_clean,
            hashed_password=hashed_pwd,
            full_name=payload.name,
            phone=payload.phone,
            role=payload.role,
            status="Pending Verification" if payload.role == "company" else "Active"
        )
        db.add(new_user)

        if payload.role == "candidate":
            can_id = f"can-{int(db.query(CandidateModel).count()) + 1000}-{unique_suffix}"
            candidate = CandidateModel(
                id=can_id,
                user_id=user_id,
                name=payload.name,
                email=email_clean,
                phone=payload.phone,
                status="Available"
            )
            db.add(candidate)

        elif payload.role == "company":
            cmp_id = f"cmp-{int(db.query(CompanyModel).count()) + 1000}-{unique_suffix}"
            company = CompanyModel(
                id=cmp_id,
                user_id=user_id,
                name=payload.company_name or payload.name,
                email=email_clean,
                phone=payload.phone,
                verification_status="Pending Approval",
                company_status="Active"
            )
            db.add(company)

        elif payload.role == "recruiter":
            rec_id = f"rec-{int(db.query(RecruiterModel).count()) + 1000}-{unique_suffix}"
            recruiter = RecruiterModel(
                id=rec_id,
                user_id=user_id,
                name=payload.name,
                email=email_clean,
                phone=payload.phone,
                assigned_company=payload.company_name or "Unassigned",
                assigned_companies=[payload.company_name] if payload.company_name else [],
                status="Active"
            )
            db.add(recruiter)

        db.commit()
        db.refresh(new_user)

        access_token = create_access_token({"sub": new_user.id, "email": new_user.email, "role": new_user.role})
        refresh_token = create_refresh_token({"sub": new_user.id})

        return {
            "status": "success",
            "message": "Registration successful.",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": new_user.id,
                "name": new_user.full_name,
                "email": new_user.email,
                "role": new_user.role,
                "status": new_user.status,
                "phone": new_user.phone
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to register user in PostgreSQL: {str(e)}"
        )

@router.post("/refresh-token")
def refresh_access_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    decoded = decode_token(payload.refresh_token)
    if decoded.get("type") != "refresh":
        raise HTTPException(status_code=400, detail="Invalid refresh token.")

    user_id = decoded.get("sub")
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    new_access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    return {"access_token": new_access_token, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == payload.email.lower().strip()).first()
    if not user:
        return {"status": "success", "message": "If account exists, password reset link has been dispatched."}

    reset_token = create_access_token({"sub": user.id, "action": "reset_password"})
    return {
        "status": "success",
        "message": f"Password reset instructions sent to {user.email}.",
        "reset_token": reset_token
    }

@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    decoded = decode_token(payload.token)
    user_id = decoded.get("sub")
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"status": "success", "message": "Password successfully reset."}

@router.post("/change-password")
def change_password(
    payload: ChangePasswordRequest,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not verify_password(payload.old_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password incorrect.")

    current_user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"status": "success", "message": "Password updated successfully."}

@router.patch("/profile")
def update_profile(
    payload: ProfileUpdateRequest,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if payload.full_name:
        current_user.full_name = payload.full_name
    if payload.phone:
        current_user.phone = payload.phone

    db.commit()
    return {
        "status": "success",
        "message": "Profile updated successfully.",
        "user": {
            "id": current_user.id,
            "name": current_user.full_name,
            "email": current_user.email,
            "phone": current_user.phone,
            "role": current_user.role
        }
    }
