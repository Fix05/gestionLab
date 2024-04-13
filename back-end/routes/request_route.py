from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db

router = APIRouter()


# Get manager asigned requests
@router.get("/get-assigned-requests/{id}")
def get_manager_assigned_requests(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
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


# Get employee requests
@router.get("/get-request-overall/{id}")
def get_employee_requests(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        cursor = db.cursor(dictionary=True)
        query = """SELECT id_request as id, type_request as type, date_request as date FROM requests WHERE fk_employee = %s"""
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


# Get requests detailed info
@router.get("/get-all-request-info/{id}")
def get_all_employee_requests_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    
    try:
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT type_request as type, date_request as date, reason_request as reason, explanation_request as explanation, state_request as state, document_request as doc, body_response_request as response, date_response_request as date_response  
            FROM requests
            LEFT JOIN 
            response_request ON fk_request = id_request
            WHERE id_request = %s;
        """

        cursor.execute(query, (id,))
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


class Response(BaseModel):
    body: str
    date: str


# Set requests response
@router.post("/set-response/{id}")
def set_request_response(response: Response, id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        cursor = db.cursor(dictionary=True)
        query = """
        INSERT INTO response_request (body_response_request, date_response_request, fk_request)
        VALUES (%s, %s, %s);
        """
        params = (response.body, response.date, id)
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