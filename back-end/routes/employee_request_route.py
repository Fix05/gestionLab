from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File
from fastapi.responses import FileResponse
from db_connection import get_db
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime
import mysql.connector
import shutil
import uuid
import os
load_dotenv()

router = APIRouter()


class NewRequest(BaseModel):
    reason: str = Form(...),
    type: str = Form(...),
    explanation: str = Form(...)


@router.post("/add-new-request/{id}")
def add_new_request(id: int, type: str = Form(...),
                    reason: str = Form(...),
                    explanation: str = Form(...),
                    file: UploadFile = File(None),
                    db: mysql.connector.MySQLConnection = Depends(get_db)):
    download_folder = os.getenv("REQUEST_DOCUMENTS_DIRECTORY", '.')
    try:
        cursor = db.cursor(dictionary=True)
        current_date = datetime.now()
        formated_date = current_date.strftime("%Y-%m-%d")
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
        if file is not None:
            format = (file.filename[len(file.filename)-6:len(file.filename)])
            unique_code = f"{current_date.strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}"
            file_path = f"{download_folder}/{unique_code+format}"
            with open(file_path, "wb") as new_file:
                shutil.copyfileobj(file.file, new_file)
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


@router.get("/get-requests-record/{id}")
def get_requests_record(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT type_request as type, reason_request as reason, 
            state_request as state, date_request as date, id_request as id
            FROM requests
            WHERE fk_employee = %s
            ORDER BY id_request DESC;
        """
        cursor.execute(query, (id, ))
        result = cursor.fetchall()
        cursor.close()
        if result:
            return result
        else:
            return {"status_code": 407, "message": "No info yet"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-all-requests-info/{id}")
def get_all_requests_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        request_info_query = f"""
            SELECT type_request as type, reason_request as reason, state_request as state, 
            date_request as date, explanation_request as body, 
            id_request as id, body_response_request as response, date_response_request as date_response, 
            fk_rh_employee as rh, name_document_request as doc
            FROM requests
            LEFT JOIN response_request on response_request.fk_request = id_request
            LEFT JOIN document_request on document_request.fk_request = id_request
            WHERE id_request = %s;
        """
        respond_request_query = f""" 
            SELECT name_person as name, lastname_person as lastname
            FROM person 
            JOIN employee on fk_person = id_person
            WHERE id_employee = %s;
        """
        cursor.execute(request_info_query, (id, ))
        result = cursor.fetchone()
        if result['response']:
            cursor.execute(respond_request_query, (result['rh'], ))
            responder_info = cursor.fetchone()
            result.update(responder_info)
        cursor.close()
        if result:
            return result
        else:
            return {"status_code": 407, "message": "No info yet"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/employee-get-request-document/{id}")
def employee_get_request_document(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT path_document_request as file_path, name_document_request as file_name
            FROM document_request
            WHERE fk_request = %s;
        """
        cursor.execute(query, (id,))
        path = cursor.fetchone()
        cursor.close()
        if path:
            return FileResponse(path=f"{path['file_path']}", media_type='application/octet-stream', filename=f"{path['file_name']}")
        else:
            return {"status_code": 406, "message": "Not found"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    


