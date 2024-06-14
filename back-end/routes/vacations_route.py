from schedule_tasks.dayly_state_update import update_employee_state
from fastapi import APIRouter, Query, HTTPException, Depends
from db_connection import get_db
from pydantic import BaseModel
from datetime import datetime
import mysql.connector
from typing import List

DATE_FORMAT = "%Y-%m-%d"

router = APIRouter()

class Dates(BaseModel):
    month: str

class NewAbsence(BaseModel):
    startDate: str
    endDate: str
    description: str
    type: str
    days: int


@router.get("/get-vacation-days-left/{id}")
def get_vacation_days_left(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_year = datetime.now().year
        cursor = db.cursor(dictionary=True)
        query = f"""
           SELECT
            (SELECT days_vacation
            FROM contract
            JOIN employee on id_contract = employee.fk_contract
            WHERE state_employee != "Deshabilitado"
            AND id_employee = %s) -
            COALESCE((SELECT SUM(taken_days_absences) as taken_days 
                    FROM absences
                    WHERE YEAR(start_date_absence) = %s
                    AND type_absence = 'Vacaciones'
                    AND fk_employee = %s), 0) AS days_left;
        """
        cursor.execute(query, (id, current_year, id))
        result = cursor.fetchone()
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


@router.post("/insert-new-absence/{id}")
def insert_absence(id: int, data: NewAbsence, 
                           db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        current_date = datetime.now()
        formated_date = current_date.strftime("%Y-%m-%d")
        startDate_datetime = datetime.fromisoformat(data.startDate)
        endDate_datetime = datetime.fromisoformat(data.endDate)
        formatedStartDate = startDate_datetime.strftime("%Y-%m-%d")
        formatedEndDate = endDate_datetime.strftime("%Y-%m-%d")
        validationQuery = f""" 
            SELECT * FROM absences 
            WHERE (
            (start_date_absence <= %s AND end_date_absence >= %s)
            OR (start_date_absence <= %s AND end_date_absence >= %s)
            )
            AND fk_employee = %s;
        """
        cursor.execute(validationQuery, (formatedStartDate,
                       formatedStartDate, formatedEndDate, formatedEndDate, id))
        result = cursor.fetchall()
        print(result, len(result))

        if (len(result) > 0):
            print("ERROR")
            return {"status_code": 410, "message": "Date range already in use"}
        query = f"""
           INSERT INTO absences (start_date_absence, end_date_absence, 
           reason_absence, document_absence, state_absence, type_absence, 
           taken_days_absences, fk_employee) 
           VALUES (%s, %s, %s, null, %s, %s, %s, %s)
        """
        if (formatedStartDate == formated_date):
            state = "En curso"
        state = "Pendiente"
        cursor.execute(query, (formatedStartDate, formatedEndDate,
                       data.description, state, data.type, data.days, id))
        db.commit()
        cursor.close()
        update_employee_state(get_db())
        return {"status_code": 200, "message": "Inserted successfully"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/vacations-date-range")
def get_vacations_date_range(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT MAX(start_date_absence) AS max, 
            MIN(start_date_absence) AS min 
            FROM absences;
        """
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        if result:
            new_date = result['max']
            new_date = new_date.replace(day=1)
            new_result = new_date.strftime(DATE_FORMAT)
            result['max'] = new_result
            return result
        else:
            return {"status_code": 403, "message": "Not found"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.post("/get-vacations-record")
def get_vacations_record(dates: Dates, roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        formated_start = dates.month
        date = datetime.strptime(formated_start, "%Y-%m")
        month = date.month
        year = date.year
        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT name_person as name, lastname_person as lastname,
            start_date_absence as start_date, end_date_absence as end_date, 
            fk_employee as id_employee, id_absences as id, state_absence as state,
            type_absence as type, taken_days_absences as taken_days
            FROM absences
            INNER JOIN employee on id_employee = fk_employee
            INNER JOIN person on id_person = fk_person
            WHERE YEAR(start_date_absence) = %s
            AND MONTH(start_date_absence) =  %s
            AND permission_employee IN ({in_clause})
            AND state_employee != "Deshabilitado";            
        """
        params = (year, month, *roles)
        cursor.execute(query, params)
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


@router.get("/get-vacation-description/{id}")
def get_vacation_description(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT reason_absence as description
            FROM absences
            WHERE id_absences = %s
        """
        cursor.execute(query, (id,))
        result = cursor.fetchone()
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



