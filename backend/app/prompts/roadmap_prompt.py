ROADMAP_SYSTEM = """You are an expert career architect. Generate a step-by-step career progression roadmap matching candidate goals and return JSON."""

ROADMAP_PROMPT = """
Target Career Goal: {target_goal}
Current Level / Skill Background: {current_level}
Desired Timeline: {timeframe}

Generate a structured career roadmap and return a JSON object with:
- target_goal: string
- current_level: string
- timeline: string
- overview: string (2-3 sentences)
- stages: list of objects, each containing:
   - step: int (1, 2, 3...)
   - stage_name: string
   - duration: string (e.g. "Months 1-2")
   - key_focus: string
   - skills_to_master: list of strings
   - action_items: list of strings
   - suggested_project: string
- career_milestones: list of strings
"""
