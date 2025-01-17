from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routes.user_routes import router as user_router
from routes.request_route import router as request_router
from routes.employee_route import router as employee_router
from routes.payment_route import router as payment_router
from routes.payment_route import run_tasks
from routes.advances_route import router as advances_router
from routes.extrahours_route import router as extrahours_router
from routes.vacations_route import router as vacations_router
from routes.employee_request_route import router as employee_request_router
from routes.stadistics_route import router as stadistics_route
from routes.ml_route import router as ml_router
import asyncio
import uvicorn
import threading
import time

APP = FastAPI()


# Mount static files directory
APP.mount("/employeeDocuments", StaticFiles(directory="C:/Users/arnog/OneDrive/Escritorio/GestionLab/documents/employeeDocuments"), name="employeeDocuments")
APP.mount("/requestDocuments", StaticFiles(directory="C:/Users/arnog/OneDrive/Escritorio/GestionLab/documents/requestDocuments"), name="requestDocuments")



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
APP.include_router(employee_request_router, prefix="/api/emplyee_requests", tags=["emplyee_requests"])
APP.include_router(stadistics_route, prefix="/api/stadistics", tags=["stadistics"])
APP.include_router(ml_router, prefix="/api/ml", tags=["recomendation"])




#run server
if __name__ == "__main__":
    uvicorn.run(APP, host="127.0.0.1", port=8000)
    