from fastapi import FastAPI  # type: ignore[import]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import]

from api.activity import router as activity_router
from api.stats import router as stats_router

from api.federal import router as federal_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(activity_router)
app.include_router(stats_router)
app.include_router(federal_router)

@app.get("/")
def root():
    return {"message": "Energy Policy Tracker API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}