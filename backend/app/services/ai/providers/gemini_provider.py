import json
import time
from typing import Any
from google import genai
from google.genai import types
from .base_provider import BaseAIProvider
from ....core.config import settings

class GeminiProvider(BaseAIProvider):
    def __init__(self):
        self._client = None
        self.model = settings.GEMINI_MODEL

    @property
    def client(self):
        if self._client is None:
            if not settings.GEMINI_API_KEY:
                raise ValueError("GEMINI_API_KEY is not set in backend/.env")
            self._client = genai.Client(api_key=settings.GEMINI_API_KEY)
        return self._client

    def generate(
        self,
        prompt: str,
        system_instruction: str = None,
        temperature: float = 0.3,
        max_tokens: int = 2048,
        response_schema: Any = None,
    ) -> dict:
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            response_mime_type="application/json",
            response_schema=response_schema,
        )
        if system_instruction:
            config.system_instruction = system_instruction

        candidate_models = [self.model, "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash-latest"]
        models_to_try = []
        for m in candidate_models:
            if m not in models_to_try:
                models_to_try.append(m)

        last_exception = None

        for model_name in models_to_try:
            max_retries = 2
            for attempt in range(max_retries):
                try:
                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=config,
                    )
                    if not response.text:
                        raise ValueError("Empty response from Gemini")
                    return json.loads(response.text)
                except Exception as e:
                    last_exception = e
                    err_str = str(e)
                    if ("429" in err_str or "RESOURCE_EXHAUSTED" in err_str) and attempt < max_retries - 1:
                        time.sleep(2 * (attempt + 1))
                        continue
                    if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                        # Break inner retry loop to try fallback model
                        break
                    raise e

        if last_exception and ("429" in str(last_exception) or "RESOURCE_EXHAUSTED" in str(last_exception)):
            raise ValueError("AI Service Rate Limit Reached. Free tier quota reset in progress — please wait 15–30 seconds and try again.")

        raise last_exception if last_exception else ValueError("Failed to generate content from AI provider.")

