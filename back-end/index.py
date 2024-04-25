from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_routes import router as user_router
from routes.request_route import router as request_router
from routes.employee_route import router as employee_router
from routes.payment_route import router as payment_router
from routes.payment_route import run_scheduled_task
from routes.advances_route import router as advances_router
from routes.extrahours_route import router as extrahours_router
from routes.vacations_route import router as vacations_router
import asyncio
import uvicorn
import threading
import time

APP = FastAPI()

ORIGINS = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

#middlewares
APP.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#routes
APP.include_router(user_router, prefix="/api/user", tags=["user"])
APP.include_router(request_router, prefix="/api/employee", tags=["requests"])
APP.include_router(employee_router, prefix="/api/rh", tags=["employee"])
APP.include_router(payment_router, prefix="/api/payment", tags=["payment"])
APP.include_router(advances_router, prefix="/api/advances", tags=["advances"])
APP.include_router(extrahours_router, prefix="/api/extras", tags=["extras"])
APP.include_router(vacations_router, prefix="/api/vacations", tags=["vacations"])


""" def background_task():
    while True:
        print("Hola")
        time.sleep(10) 


background_thread = threading.Thread(target=background_task)
background_thread.daemon = True
background_thread.start() """

#run server
if __name__ == "__main__":
    uvicorn.run(APP, host="127.0.0.1", port=8000)
    