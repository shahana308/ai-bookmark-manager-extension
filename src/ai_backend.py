import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hugging Face API settings
HF_API_URL_CLASSIFICATION = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
HF_API_URL_SUMMARIZATION = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

HEADERS = {"Authorization": f"Bearer {HF_API_TOKEN}"}

class ClassifyTextData(BaseModel):
    title: str
    url: str

class SummaryRequest(BaseModel):
    text: str

@app.post("/classify")
def classify_page(data: ClassifyTextData):
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
    payload = {
        "inputs": text,
        "parameters": {"candidate_labels": candidate_labels},
    }
    response = requests.post(HF_API_URL_CLASSIFICATION, headers=HEADERS, json=payload)
    result = response.json()

    # Extract and return the top label
    if response.status_code == 200:
        return {"category": result["labels"][0]}
    else:
        return {"error": result.get("error", "Failed to classify.")}

@app.post("/summarize")
def summarize(data: SummaryRequest):
    payload = {"inputs": data.text, "parameters": {"max_length": 200, "min_length": 25, "do_sample": False}}
    response = requests.post(HF_API_URL_SUMMARIZATION, headers=HEADERS, json=payload)
    print("Response status code:", response.status_code)
    print("Response JSON:", response.json())
    result = response.json()
    return {"summary": result[0]["summary_text"]}