import os
import shutil
import datetime
from pathlib import Path
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.db_models import FileModel, UserModel
from app.core.security import get_current_user

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB limit

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    entity_type: Optional[str] = Form("Resume"),
    entity_id: Optional[str] = Form(None),
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file extension '{ext}'. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    file_id = f"file-{int(db.query(FileModel).count()) + 1000}"
    saved_filename = f"{file_id}_{file.filename}"
    file_path = UPLOAD_DIR / saved_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(file_path)
    if file_size > MAX_FILE_SIZE:
        os.remove(file_path)
        raise HTTPException(status_code=400, detail="File size exceeds maximum limit of 10 MB.")

    new_file = FileModel(
        id=file_id,
        filename=saved_filename,
        original_name=file.filename,
        file_size=file_size,
        mime_type=file.content_type or "application/octet-stream",
        owner_id=current_user.id,
        owner_email=current_user.email,
        entity_type=entity_type or "Resume",
        entity_id=entity_id,
        file_path=str(file_path),
        upload_date=datetime.datetime.utcnow()
    )

    db.add(new_file)
    db.commit()

    return {
        "status": "success",
        "message": f"File '{file.filename}' uploaded successfully.",
        "file": {
            "id": new_file.id,
            "original_name": new_file.original_name,
            "size": new_file.file_size,
            "type": new_file.entity_type,
            "upload_date": new_file.upload_date.isoformat()
        }
    }

@router.get("/{file_id}/download")
def download_file(
    file_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    file_record = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not file_record:
        raise HTTPException(status_code=404, detail="File not found.")

    if not os.path.exists(file_record.file_path):
        raise HTTPException(status_code=404, detail="File binary not found on server disk.")

    return FileResponse(
        path=file_record.file_path,
        filename=file_record.original_name,
        media_type=file_record.mime_type
    )

@router.delete("/{file_id}")
def delete_file(
    file_id: str,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    file_record = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not file_record:
        raise HTTPException(status_code=404, detail="File record not found.")

    if current_user.role != "admin" and file_record.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to delete this file.")

    if os.path.exists(file_record.file_path):
        try:
            os.remove(file_record.file_path)
        except Exception:
            pass

    db.delete(file_record)
    db.commit()
    return {"status": "success", "message": f"File '{file_record.original_name}' deleted."}
