from fastapi import APIRouter, Query, HTTPException, Depends
from db_connection import get_db
from pydantic import BaseModel
from datetime import datetime
from typing import List
import mysql.connector
DATE_FORMAT = "%Y-%m-%d"
router = APIRouter()


class Dates(BaseModel):
    month: str

class NewAdvance(BaseModel):
    amount: float
    description: str


@router.post("/get-advances-record")
def get_advances_record(dates: Dates, roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:    
        formated_start = dates.month
        date = datetime.strptime(formated_start, "%Y-%m")
        month = date.month
        year = date.year
        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT name_person as name, lastname_person as lastname, id_employee, id_remuneration_record as id_remuneration,
            base_salary_employee as base_salary, id_advance_record as id_advance, date_advance as date, state_advance as state,
            amount_advance as amount
            FROM advance_record
            INNER JOIN remuneration_record on advance_record.fk_remuneration_record = id_remuneration_record
            INNER JOIN employee on id_employee = remuneration_record.fk_employee
            INNER JOIN person on id_person = fk_person
            WHERE YEAR(date_advance) = %s
            AND MONTH(date_advance) =  %s
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



@router.get("/advances-date-range")
def get_advances_date_range(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT MAX(date_advance) AS max, 
            MIN(date_advance) AS min 
            FROM advance_record;
        """
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        if result['max']:
            new_date = result['max']
            new_date = new_date.replace(day=1)
            new_result = new_date.strftime(DATE_FORMAT)
            result['max'] = new_result
            return result
        else:
            return {"status_code": 407, "message": "No info yet"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    
#info to show in the Add Advance page table 
@router.get("/get-add-advances-overall")
def get_add_advances_overall(roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT person.lastname_person as lastname, person.name_person as name,
            person.dni_person as dni, department_employee as department, id_employee as id, 
            state_employee as state, base_salary_employee as base_salary
            FROM person 
            JOIN employee ON person.id_person = employee.fk_person
            JOIN salary_info ON id_salary_info = employee.fk_salary_info
            WHERE permission_employee IN ({in_clause})
            AND state_employee != "Deshabilitado";
        """

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
        

#get each employee advances info
@router.get("/get-employee-advances/{id}")
def get_employees_advances(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_date = datetime.now().strftime("%Y-%m")
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT amount_advance as amount, date_advance as date, id_advance_record as id
            FROM advance_record
            JOIN remuneration_record ON advance_record.fk_remuneration_record = id_remuneration_record
            JOIN employee ON id_employee = remuneration_record.fk_employee
            WHERE employee.id_employee = %s
            AND DATE_FORMAT(date_advance, '%Y-%m') = %s
            AND state_advance = 'Por cobrar';
        """
        cursor.execute(query, (id, current_date))
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
    


@router.post("/add-advances/{id}")
def add_advance(id: int, data: NewAdvance, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_date = datetime.now().strftime("%Y-%m-%d")
        cursor = db.cursor(dictionary=True)
        
        query = f"""
            INSERT INTO advance_record 
            VALUES (0, %s, %s, 'Por cobrar', %s,
            (SELECT id_remuneration_record 
            FROM remuneration_record 
            WHERE %s <= max_pay_date_remuneration 
            AND %s >= min_pay_date_remuneration
            AND fk_employee = %s)); 
        """
        cursor.execute(query, (data.amount, current_date, data.description, current_date, current_date, id))
        db.commit()
        cursor.close()
        return {"status_code": 200, "message": "Inserted successfully"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    

@router.delete("/delete-advances/{id}")
def delete_advance(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            DELETE FROM advance_record WHERE id_advance_record = %s;
        """
        cursor.execute(query, (id,))
        db.commit()
        cursor.close()
        return {"status_code": 200, "message": "Deleted successfully"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    
@router.get("/get-advance-description/{id}")
def get_advance_description(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT description_advance as description
            FROM advance_record
            WHERE id_advance_record = %s
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