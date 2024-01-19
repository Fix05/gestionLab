from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_routes import router as user_router
import uvicorn

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

#middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#routes
app.include_router(user_router, prefix="/api/user", tags=["user"])

#run server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)