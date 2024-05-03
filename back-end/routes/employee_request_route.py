from fastapi import APIRouter, HTTPException, Depends, Form
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db
import os
from dotenv import load_dotenv
import shutil
from fastapi import UploadFile, File
from fastapi.responses import FileResponse
import uuid
from datetime import datetime
load_dotenv()

router = APIRouter()


class NewRequest(BaseModel):
    reason: str = Form(...),
    type: str = Form(...),
    explanation: str = Form(...)


""" @router.post("/add-new-request/{id}")
def add_new_request(id: int, file: UploadFile = File(...), db: mysql.connector.MySQLConnection = Depends(get_db)):
    download_folder = os.getenv("REQUEST_DOCUMENTS_DIRECTORY", '.')
    try:

        
        cursor = db.cursor(dictionary=True)
        current_date = datetime.now()
        formated_date = current_date.strftime("%Y-%m-%d")
        unique_code = f"{current_date.strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}"
        format = (file.filename[len(file.filename)-4:len(file.filename)])
        file_path = f"{download_folder}/{unique_code+format}"
        with open(file_path, "wb") as new_file:
            shutil.copyfileobj(file.file, new_file)

        return {"status_code": 200, "message": "Inserted successfully"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
 """

@router.post("/add-new-request/{id}")
def add_new_request(id: int, type: str = Form(...),
                             reason: str = Form(...),
                             explanation: str = Form(...),
                             file: UploadFile = File(...), 
                             db: mysql.connector.MySQLConnection = Depends(get_db)):
    download_folder = os.getenv("REQUEST_DOCUMENTS_DIRECTORY", '.')
    try:

        print(type, reason, explanation, file)

        cursor = db.cursor(dictionary=True)
        current_date = datetime.now()
        formated_date = current_date.strftime("%Y-%m-%d")
        unique_code = f"{current_date.strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}"
        format = (file.filename[len(file.filename)-6:len(file.filename)])
        file_path = f"{download_folder}/{unique_code+format}"
        with open(file_path, "wb") as new_file:
            shutil.copyfileobj(file.file, new_file)

        add_request_query = f""" 
            INSERT INTO requests (type_request, reason_request, explanation_request, fk_employee, date_request, state_request)
            VALUES (%s, %s, %s, %s, %s, "Esperando")
        """

        params = (type, reason, explanation, id, formated_date)
        cursor.execute(add_request_query, params)

        cursor.execute("SET @last_request_id = LAST_INSERT_ID();")

        add_doc_query = f"""
            INSERT INTO document_request (path_document_request, fk_request, name_document_request)
            VALUES (%s, @last_request_id, %s)
        """

        cursor.execute(add_doc_query, (file_path, file.filename))
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Inserted successfully"}

    except mysql.connector.Error as e:
        print("Error:", e)                   
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print("Error:", e)                     
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")



@router.get("/getFile")
def get_file():
    download_folder = os.getenv("REQUEST_DOCUMENTS_DIRECTORY", '.')
    return FileResponse(path=f"{download_folder}/20240501082715_673405ec01.pdf", media_type='application/octet-stream')