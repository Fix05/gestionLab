from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db
import os
from dotenv import load_dotenv
import shutil
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
import uuid
from datetime import datetime
load_dotenv()

router = APIRouter()


class NewRequest(BaseModel):
    file: str


@router.post("/add-new-request/{id}")
def get_manager_assigned_requests(id: int, file: UploadFile = File(...),  db: mysql.connector.MySQLConnection = Depends(get_db)):
    download_folder = os.getenv("REQUEST_DOCUMENTS_DIRECTORY", '.')
    print(download_folder)
    try:

        unique_code = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}"
        print(unique_code)
        with open(f"{download_folder}/{unique_code}", "wb") as new_file:
            shutil.copyfileobj(file.file, new_file)

        return JSONResponse(status_code=200, content={"message": "Archivo guardado correctamente"})


        cursor = db.cursor(dictionary=True)
        query = """SELECT name_person as name, lastname_person as lastname, type_request as type, reason_request as reason, state_request as state, date_request as date, id_request as id 
            FROM requests 
            join employee on fk_employee = id_employee
            join person on fk_person = id_person
            WHERE rh_manager = %s;"""
        
        cursor.execute(query, (id,))
        result = cursor.fetchall()
        cursor.close()
        
        if result:
            return result
        else:
            return {"status_code": 403, "message": "Not found"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
