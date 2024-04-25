from fastapi import APIRouter, Query, HTTPException, Depends
from datetime import datetime
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db

router = APIRouter()


class NewAbsence(BaseModel):
    start_date: str
    end_date: str
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
            WHERE id_employee = %s) -
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
def get_vacation_days_left(id: int, data: NewAbsence, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_date = datetime.now()
        formated_date = current_date.strftime("%Y-%m-%d")
        cursor = db.cursor(dictionary=True)

        validationQuery = f""" 
            SELECT * FROM absences 
            WHERE (
            (start_date_absence <= %s AND end_date_absence >= %s)
            OR (start_date_absence <= %s AND end_date_absence >= %s)
            )
            AND fk_employee = %s;
        """

        cursor.execute(validationQuery, (data.start_date, data.start_date, data.end_date, data.end_date, id))
        result = cursor.fetchall()

        if(result):
            return {"status_code": 410, "message": "Date range already in use"}
        
        query = f"""
           INSERT INTO absences (start_date_absence, end_date_absence, 
           reason_absence, document_absence, state_absence, type_absence, 
           taken_days_absences, fk_employee) 
           VALUES (%s, %s, %s, null, %s, %s, %s, %s)
        """
        
        if (data.start_date == formated_date):
            state = "En curso"
        state = "Pendiente"

        cursor.execute(query, (data.start_date, data.end_date,
                       data.description, state, data.type, data.days, id))
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Inserted successfully"}
       
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
