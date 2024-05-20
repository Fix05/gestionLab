from fastapi import FastAPI, APIRouter, Query, File, Depends, Form, UploadFile
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db

router = APIRouter()



@router.post("/upload-multiple-pdfs/")
async def upload_multiple_pdfs(
    category: str = Form(...),
    description: str = Form(...),
    files: List[List[UploadFile]] = File(...)
):
    for file_list in files:
        for file in file_list:
            contents = await file.read()

    return {"message": "Archivos y datos recibidos correctamente", "category": category, "description": description}