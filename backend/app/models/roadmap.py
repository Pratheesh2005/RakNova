from pydantic import BaseModel, Field
from typing import List, Optional

class RoadmapMilestone(BaseModel):
    step: int
    stage_name: str
    duration: str
    key_focus: str
    skills_to_master: List[str]
    action_items: List[str]
    suggested_project: str

class CareerRoadmapResponse(BaseModel):
    target_goal: str
    current_level: str
    timeline: str
    overview: str
    stages: List[RoadmapMilestone]
    career_milestones: List[str]
