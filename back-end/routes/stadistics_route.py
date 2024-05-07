from fastapi import APIRouter, Query, HTTPException, Depends
from fastapi.responses import FileResponse
from typing import List
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db


router = APIRouter()

@router.get("/get-extras-vs-time/{time}")
def get_manager_assigned_requests(time: str, db: mysql.connector.MySQLConnection = Depends(get_db)):

    time_expression = f"{time}(date_extras)"

    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT {time_expression} AS mes, SUM(hours_extras) AS total_horas_extra
            FROM extras_record
            GROUP BY {time_expression};
        """

        cursor.execute(query)
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
    




@router.get("/get-absences-vs-employee-vs-type")
def get_absences_employee_type_relation(db: mysql.connector.MySQLConnection = Depends(get_db)):

    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT CONCAT(p.name_person, ' ', p.lastname_person) as name,
            SUM(CASE WHEN a.type_absence = 'Salud' THEN a.taken_days_absences ELSE 0 END) as Salud,
            SUM(CASE WHEN a.type_absence = 'Calamidad doméstica' THEN a.taken_days_absences ELSE 0 END) as 'Calamidad doméstica',
            SUM(CASE WHEN a.type_absence = 'Otro' THEN a.taken_days_absences ELSE 0 END) as Otro
            FROM absences a
            JOIN employee e ON a.fk_employee = e.id_employee
            JOIN person p ON e.fk_person = p.id_person
            GROUP BY a.fk_employee;
        """

        cursor.execute(query)
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
    



@router.get("/get-count-requests-vs-type")
def get_count_requests_vs_type(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT type_request, count(*) as type_count 
            FROM requests
            group by (type_request)
        """

        cursor.execute(query)
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
