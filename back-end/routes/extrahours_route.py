from fastapi import APIRouter, Query, HTTPException, Depends
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db

router = APIRouter()


class Dates(BaseModel):
    start_date: str


class NewExtras(BaseModel):
    hours: int
    amount: float
    description: str


@router.post("/get-extrahours-record")
def get_extrahours_record(dates: Dates, roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:

        DATE_FORMAT = "%Y-%m-%d"
        print(dates.start_date)
        formated_start = dates.start_date + "-01"
        date = datetime.strptime(formated_start, DATE_FORMAT)
        new_date = date + timedelta(days=32)
        new_date = new_date.replace(day=1)
        formated_end = new_date.strftime(DATE_FORMAT)

        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT name_person as name, lastname_person as lastname, id_employee, id_remuneration_record as id_remuneration,
            base_salary_employee as base_salary, id_extras_record as id_extra, date_extras as date, state_extra as state,
            amount_extras as amount, hours_extras as hours
            FROM extras_record
            INNER JOIN remuneration_record on extras_record.fk_remuneration_record = id_remuneration_record
            INNER JOIN employee on id_employee = remuneration_record.fk_employee
            INNER JOIN person on id_person = fk_person
            WHERE date_extras >= %s
            AND date_extras < %s
            AND permission_employee IN ({in_clause});            
        """

        """
            SELECT name_person as name, lastname_person as lastname, id_employee, id_salary_info as id_salary,
            base_salary_employee as base_salary, id_extras_record as id_extra, date_extras as date, state_extra as state,
            amount_extras as amount, hours_extras as hours
            FROM extras_record
            INNER JOIN salary_info on extras_record.fk_salary_info = id_salary_info
            INNER JOIN employee on id_salary_info = employee.fk_salary_info
            INNER JOIN person on id_person = fk_person
            WHERE date_extras >= %s
            AND date_extras < %s
            AND permission_employee IN ({in_clause});
        """

        params = (formated_start, formated_end, *roles)
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


@router.get("/extrahours-date-range")
def get_extrahours_date_range(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT MAX(date_extras) AS max, 
            MIN(date_extras) AS min 
            FROM extras_record;
        """

        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()

        DATE_FORMAT = "%Y-%m-%d"

        if result:
            new_date = result['max']
            print(new_date)
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


#get extra info to show in the Add Extra page table
@router.get("/get-add-extras-overall")
def get_add_extras_overall(roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
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
            WHERE permission_employee IN ({in_clause});
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

#get each employee extras info
@router.get("/get-employee-extras/{id}")
def get_employess_extras(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_date = datetime.now().strftime("%Y-%m")
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT amount_extras as amount, date_extras as date, id_extras_record as id,
            hours_extras as hours
            FROM extras_record
            JOIN remuneration_record ON extras_record.fk_remuneration_record = id_remuneration_record
            JOIN employee ON id_employee = remuneration_record.fk_employee
            WHERE employee.id_employee = %s
            AND DATE_FORMAT(date_extras, '%Y-%m') = %s
            AND state_extra = 'Por pagar';
        """

        print(id, current_date)
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


@router.post("/add-extras/{id}")
def add_extras(id: int, data: NewExtras, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        current_date = datetime.now().strftime("%Y-%m-%d")
        cursor = db.cursor(dictionary=True)
        query = f"""
            INSERT INTO extras_record 
            VALUES (0, %s, %s, %s, 'Por pagar', %s, 
            (SELECT id_remuneration_record 
            FROM remuneration_record 
            WHERE %s <= max_pay_date_remuneration 
            AND %s >= min_pay_date_remuneration
            AND fk_employee = %s)); 
        """
        
        cursor.execute(query, (data.hours, current_date, data.amount, data.description, current_date, current_date, id))
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Inserted successfully"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")



@router.delete("/delete-extras/{id}")
def delete_extras(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            DELETE FROM extras_record WHERE id_extras_record = %s;
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


@router.get("/get-extra-description/{id}")
def get_extra_description(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT description_extras as description
            FROM extras_record
            WHERE id_extras_record = %s
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
