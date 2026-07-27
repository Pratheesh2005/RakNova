from abc import ABC, abstractmethod
from typing import Any

class BaseAIProvider(ABC):
    """Abstract interface for AI model providers."""
    
    @abstractmethod
    def generate(
        self,
        prompt: str,
        system_instruction: str = None,
        temperature: float = 0.3,
        max_tokens: int = 2048,
        response_schema: Any = None,
    ) -> dict:
        """Generate a response and return a dictionary."""
        pass
