import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# PostgreSQL connection URL for raknova_db with user credentials
POSTGRES_DEFAULT_URL = "postgresql://postgres:0909@localhost:5432/raknova_db"
DATABASE_URL = os.getenv("DATABASE_URL") or getattr(settings, "DATABASE_URL", None) or POSTGRES_DEFAULT_URL

try:
    connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    engine = create_engine(
        DATABASE_URL,
        connect_args=connect_args,
        pool_pre_ping=True,
        echo=False
    )
    with engine.connect() as conn:
        pass
    print(f"[Database] Connected successfully to PostgreSQL at {DATABASE_URL}")
except Exception as err:
    print(f"[Warning] PostgreSQL connection to {DATABASE_URL} failed ({err}). Falling back to SQLite.")
    DATABASE_URL = "sqlite:///./raknova.db"
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        pool_pre_ping=True,
        echo=False
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
