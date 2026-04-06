from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.routers.auth import get_current_user
from app.services.ai_service import get_ai_response
from app.models.chat import Message

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: str

    class Config:
        from_attributes = True

@router.post("/message")
def send_message(
    request: ChatRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get conversation history (last 10 messages for context)
    history = db.query(Message).filter(
        Message.user_id == current_user.id
    ).order_by(Message.created_at.desc()).limit(10).all()
    history.reverse()

    # Build messages list for AI
    messages = [{"role": msg.role, "content": msg.content} for msg in history]
    messages.append({"role": "user", "content": request.message})

    # Save user message
    user_msg = Message(user_id=current_user.id, role="user", content=request.message)
    db.add(user_msg)
    db.commit()

    # Get AI response
    ai_response = get_ai_response(messages)

    # Save assistant message
    assistant_msg = Message(user_id=current_user.id, role="assistant", content=ai_response)
    db.add(assistant_msg)
    db.commit()
    db.refresh(assistant_msg)

    return {
        "user_message": {"id": user_msg.id, "role": "user", "content": request.message, "created_at": str(user_msg.created_at)},
        "assistant_message": {"id": assistant_msg.id, "role": "assistant", "content": ai_response, "created_at": str(assistant_msg.created_at)}
    }

@router.get("/history")
def get_history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    messages = db.query(Message).filter(
        Message.user_id == current_user.id
    ).order_by(Message.created_at.asc()).all()
    
    return [
        {"id": msg.id, "role": msg.role, "content": msg.content, "created_at": str(msg.created_at)}
        for msg in messages
    ]

@router.delete("/history")
def clear_history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.query(Message).filter(Message.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Chat history cleared"}
