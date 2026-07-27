import uuid
from datetime import datetime

def generate_request_id() -> str:
    """Generate a unique request ID with timestamp."""
    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    short_uuid = str(uuid.uuid4())[:8]
    return f"AI-{timestamp}-{short_uuid}"
