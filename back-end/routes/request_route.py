from fastapi import APIRouter, Query, HTTPException, Depends
from fastapi.responses import FileResponse
from typing import List
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db

router = APIRouter()


class Response(BaseModel):
    body: str
    date: str
    rh: int


# Get manager asigned requests
@router.get("/get-assigned-requests/{id}")
def get_manager_assigned_requests(id: int, roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        in_clause = ', '.join(['%s' for _ in roles])
        cursor = db.cursor(dictionary=True)
        query = f"""SELECT name_person as name, lastname_person as lastname, type_request as type, reason_request as reason, state_request as state, date_request as date, id_request as id
            FROM requests
            join employee on fk_employee = id_employee
            join person on fk_person = id_person
            WHERE permission_employee IN ({in_clause});"""

        cursor.execute(query, roles)
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



# Get requests detailed info
@router.get("/get-all-request-info/{id}")
def get_all_employee_requests_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        cursor = db.cursor(dictionary=True)
        infoQuery = """
            SELECT type_request as type, date_request as date, reason_request as reason, explanation_request as explanation, state_request as state, name_document_request as doc, body_response_request as response, date_response_request as date_response
            FROM requests
            LEFT JOIN document_request ON document_request.fk_request = id_request
            LEFT JOIN response_request ON response_request.fk_request = id_request
            WHERE id_request = %s;
        """

        cursor.execute(infoQuery, (id,))
        result = cursor.fetchone()
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


@router.get("/get-request-document/{id}")
def get_request_document(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT path_document_request as file_path, name_document_request as name_file
            FROM document_request
            WHERE fk_request = %s;
        """

        cursor.execute(query, (id,))
        path = cursor.fetchone()
        cursor.close()



        if path:
            return FileResponse(path=f"{path['file_path']}", media_type='application/octet-stream', filename=f"{path['name_file']}")
        else:
            return {"status_code": 403, "message": "Not found"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")









# Set requests response
@router.post("/set-response/{id}")
def set_request_response(response: Response, id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        print(response.body, response.date, id, response.rh)
        cursor = db.cursor(dictionary=True)
        query = """
        INSERT INTO response_request (body_response_request, date_response_request, fk_request, fk_rh_employee)
        VALUES (%s, %s, %s, %s);
        """
        params = (response.body, response.date, id, response.rh)
        cursor.execute(query, params)
        db.commit()
        cursor.close()
        return {"status_code": 200, "message": "Inserted successfully"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")





# Update request state
@router.put("/update-request-state/{id}")
def update_request_state(updated_data: dict, id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        cursor = db.cursor(dictionary=True)
        query = """
        UPDATE requests SET state_request = %s 
        WHERE id_request = %s;
        """
        key, value = updated_data.popitem()
        cursor.execute(query, (value, id,))
        db.commit()
        cursor.close()
        return {"status_code": 200, "message": "Updated successfully"}
    
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")