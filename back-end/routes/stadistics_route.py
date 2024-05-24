from fastapi import APIRouter, Query, HTTPException, Depends
import mysql.connector
from db_connection import get_db


router = APIRouter()

@router.get("/get-extras-vs-time/{time}")
def get_manager_assigned_requests(time: str, db: mysql.connector.MySQLConnection = Depends(get_db)):

    time_expression = f"{time}(date_extras)"

    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT {time_expression} AS mes, SUM(hours_extras) AS 'Horas extra'
            FROM extras_record
            JOIN remuneration_record on fk_remuneration_record = id_remuneration_record
            JOIN employee on fk_employee = id_employee
            WHERE state_employee != "Deshabilitado"
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
            SELECT CONCAT(p.name_person, ' ', p.lastname_person) AS name,
                SUM(CASE WHEN a.type_absence = 'Salud' THEN a.taken_days_absences ELSE 0 END) AS Salud,
                SUM(CASE WHEN a.type_absence = 'Calamidad doméstica' THEN a.taken_days_absences ELSE 0 END) AS 'Calamidad doméstica',
                SUM(CASE WHEN a.type_absence = 'Otro' THEN a.taken_days_absences ELSE 0 END) AS Otro
            FROM (
                SELECT *
                FROM absences
                WHERE type_absence = 'Salud' OR type_absence = 'Calamidad doméstica' OR type_absence = 'Otro'
            ) a
            JOIN employee e ON a.fk_employee = e.id_employee
            JOIN person p ON e.fk_person = p.id_person
            WHERE e.state_employee != "Deshabilitado"
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
            JOIN employee WHERE fk_employee = id_employee
            AND state_employee != "Deshabilitado"
            GROUP BY (type_request)
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
            
            
            
@router.get("/get-requests-vs-employee-vs-type")
def get_requests_employee_type_relation(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT CONCAT(p.name_person, ' ', p.lastname_person) as name,
            COUNT(CASE WHEN r.type_request = 'Vacaciones' THEN 1 ELSE null END) as Vacaciones,
            COUNT(CASE WHEN r.type_request = 'Permiso' THEN 1 ELSE null END) as Permiso,
            COUNT(CASE WHEN r.type_request = 'Adelanto' THEN 1 ELSE null END) as Adelanto,
            COUNT(CASE WHEN r.type_request = 'Cambio de horario' THEN 1 ELSE null END) as 'Cambio de horario',
            COUNT(CASE WHEN r.type_request = 'Reclamación' THEN 1 ELSE null END) as 'Reclamación',
            COUNT(CASE WHEN r.type_request = 'Otro' THEN 1 ELSE null END) as Otro
            FROM requests r
            JOIN employee e ON r.fk_employee = e.id_employee
            JOIN person p ON e.fk_person = p.id_person
            WHERE e.state_employee != "Deshabilitado"
            GROUP BY r.fk_employee;
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
