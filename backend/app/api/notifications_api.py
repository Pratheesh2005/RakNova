import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import NotificationModel, UserModel
from app.core.security import get_current_user

router = APIRouter()

class CreateNotificationPayload(BaseModel):
    recipient_role: str  # "Candidate", "Company", "Recruiter", "Super Admin", "All"
    recipient_email: Optional[str] = None
    title: str
    message: str
    category: Optional[str] = "System"  # "System", "Job", "Application", "Interview", "AI", "Security"
    priority: Optional[str] = "Medium"  # "Low", "Medium", "High", "Critical"

@router.get("")
def get_user_notifications(
    category: Optional[str] = None,
    priority: Optional[str] = None,
    read: Optional[bool] = None,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(NotificationModel)

    if current_user.role != "admin":
        query = query.filter(
            (NotificationModel.recipient_role == current_user.role.capitalize()) |
            (NotificationModel.recipient_role == "All") |
            (NotificationModel.recipient_email == current_user.email)
        )

    if category and category != "All":
        query = query.filter(NotificationModel.category == category)

    if priority and priority != "All":
        query = query.filter(NotificationModel.priority == priority)

    if read is not None:
        query = query.filter(NotificationModel.read == read)

    notifs = query.order_by(NotificationModel.created_at.desc()).all()

    total_count = len(notifs)
    unread_count = len([n for n in notifs if not n.read])

    return {
        "metrics": {
            "total": total_count,
            "unread": unread_count,
            "read": total_count - unread_count
        },
        "notifications": notifs
    }

@router.post("")
def dispatch_notification(
    payload: CreateNotificationPayload,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notif_id = f"notif-{int(db.query(NotificationModel).count()) + 1000}"
    new_notif = NotificationModel(
        id=notif_id,
        recipient_role=payload.recipient_role,
        recipient_email=payload.recipient_email,
        title=payload.title,
        message=payload.message,
        category=payload.category or "System",
        priority=payload.priority or "Medium",
        read=False,
        created_at=datetime.datetime.utcnow()
    )

    db.add(new_notif)
    db.commit()

    return {"status": "success", "notification_id": notif_id}

@router.patch("/{notif_id}/read")
def mark_notification_read(
    notif_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notif = db.query(NotificationModel).filter(NotificationModel.id == notif_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found.")

    notif.read = True
    db.commit()
    return {"status": "success", "message": "Notification marked as read."}

@router.post("/mark-all-read")
def mark_all_notifications_read(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(NotificationModel)
    if current_user.role != "admin":
        query = query.filter(
            (NotificationModel.recipient_role == current_user.role.capitalize()) |
            (NotificationModel.recipient_email == current_user.email)
        )

    query.update({"read": True}, synchronize_session=False)
    db.commit()
    return {"status": "success", "message": "All notifications marked as read."}

@router.delete("/{notif_id}")
def delete_notification(
    notif_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notif = db.query(NotificationModel).filter(NotificationModel.id == notif_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found.")

    db.delete(notif)
    db.commit()
    return {"status": "success", "message": "Notification deleted."}
