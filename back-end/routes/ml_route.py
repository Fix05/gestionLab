from fastapi import FastAPI, APIRouter, Query, File, Depends, Form, UploadFile
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db

router = APIRouter()



@router.post("/upload-multiple-pdfs")
async def upload_multiple_pdfs(position: str = Form(...), requirements: str = Form(...), files: List[UploadFile] = File(...), fileGroups: List[int] = Form(...)):

    new_arr = []

    number_of_groups = max(fileGroups) if fileGroups else 0

    for i in range(number_of_groups+1):
        new_arr.append([])

    for index, group in enumerate(fileGroups):
        file = files[index]
        group_index = int(group)
        new_arr[group_index].append(file)    

    print(new_arr)
    return {"message": f"Archivos y datos recibidos correctamente psición: {position}, requerimientos: {requirements}"}