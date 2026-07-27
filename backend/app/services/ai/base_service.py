from abc import ABC, abstractmethod
from .client import ai_client
from ...models.ai_response import AIResponse

class BaseAIService(ABC):
    """Base class for all AI feature services using the unified client."""
    
    def __init__(self):
        self.client = ai_client
    
    @abstractmethod
    def execute(self, *args, **kwargs) -> AIResponse:
        pass
    
    def _generate(self, prompt: str, **kwargs) -> AIResponse:
        """Helper to call the client and return AIResponse."""
        return self.client.generate(prompt, **kwargs)
