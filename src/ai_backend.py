from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

class TextData(BaseModel):
    title: str
    url: str

@app.post("/classify")
def classify_page(data: TextData):
    text = f"{data.title} {data.url}"  
    candidate_labels = [
        "Travel", "Development", "Programming", "Technology", "Software Engineering",
        "Web Development", "Machine Learning", "Design", "UI/UX Design",
        "Graphic Design", "Product Design", "Learning", "Education",
        "Online Courses", "Research", "News", "Politics", "World Events",
        "Science", "Entertainment", "Movies", "Music", "Gaming", "TV Shows",
        "Sports", "Social Media", "Trends", "TikTok", "Instagram", "Twitter",
        "Self-Help", "Health and Wellness", "Fitness", "Productivity",
        "Business", "Finance", "Investing", "Startups", "Marketing",
        "Food", "Lifestyle", "Photography"
    ]    
    result = classifier(text, candidate_labels=candidate_labels)  
    return {"category": result["labels"][0]} 