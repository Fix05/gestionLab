from fastapi import APIRouter, Query, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db

router = APIRouter()


FIELD_TO_TABLE_MAPPING = {
        "name_person": "person",
        "lastname_person": "person",
        "dni_person": "person",
        "email_person": "person",
        "number_person": "person",
        "address_person": "person",
        "birth_date_person": "person",
        "emergency_number": "person",
        "nationality_person": "person",
        "gender_person": "person",
        "duration_contract": "contract",
        "start_day_contract": "contract",
        "description_contract": "contract",
        "benefits_contract": "contract",
        "hours_per_day": "contract",
        "bonuses_contract": "contract",
        "special_requirements": "contract",
        "department_employee": "employee",
        "state_employee": "employee",
        "base_salary": "salary_info",
        "days_vacation": "contract",
    }

# Get basic user info, email, name,
@router.get("/get-info/{id}")
def get_employee_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT person.name_person as name, person.lastname_person as lastname, person.email_person as email
            FROM person 
            JOIN employee ON person.id_person = employee.fk_person 
            WHERE employee.id_employee = %s
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


# Get Name lastname, dni, department, state
@router.get("/get-employees-overall")
def get_employees_overall(roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT person.lastname_person as lastname, person.name_person as name,
            person.dni_person as dni, department_employee as department, id_employee as id, 
            state_employee as state 
            FROM person 
            JOIN employee ON person.id_person = employee.fk_person
            WHERE permission_employee IN ({in_clause})
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


# Get employees detailed info
@router.get("/get-all-employee-info/{id}")
def get_all_employee_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    
    try:
        cursor = db.cursor(dictionary=True)
        query = """
        SELECT name_person, lastname_person, dni_person, 
            email_person, number_person, address_person,
            birth_date_person, emergency_number, nationality_person, 
            gender_person, duration_contract, start_day_contract, 
            description_contract, benefits_contract,
            hours_per_day, bonuses_contract, special_requirements, 
            department_employee, state_employee, base_salary, 
            days_vacation
            FROM person 
            JOIN employee on id_person = fk_person
            JOIN contract on fk_contract = id_contract
            JOIN salary_info on id_salary_info = fk_salary_info
            WHERE id_employee = %s;
        """
        cursor.execute(query, (id,))
        result = cursor.fetchone()
        cursor.close()

        """ This is not necesary there shouldn't be employees with no info  """
        """ if not result:
            result = {key: "" for key, value in FIELD_TO_TABLE_MAPPING.items()} """

        if result:
            return result
        else:
            return {"status_code": 403, "message": "Not found"}
                

        return result
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


# Update employee info
@router.put("/update-employee-info/{id}")
def update_employee_info(id: int, updated_data: dict, db: mysql.connector.MySQLConnection = Depends(get_db)):

    print(updated_data)

    try:
        cursor = db.cursor(dictionary=True)

        field, value = updated_data.popitem()
        

        if field in FIELD_TO_TABLE_MAPPING:
            table_name = FIELD_TO_TABLE_MAPPING[field]

            if table_name == "person":
                query = f"""
                UPDATE person
                JOIN employee on id_person = fk_person
                SET {field} = %s
                WHERE employee.id_employee = %s;
                """

            if table_name == "employee":
                query = f"""
                UPDATE employee
                SET {field} = %s
                WHERE employee.id_employee = %s;
                """

            if table_name == "salary_info":
                query = f"""
                UPDATE salary_info
                JOIN employee on fk_salary_info = id_salary_info
                SET {field} = %s
                WHERE employee.id_employee = %s;
                """

            if table_name == "contract":
                query = f"""
                UPDATE contract
                JOIN employee on fk_contract = id_contract
                SET {field} = %s
                WHERE employee.id_employee = %s;
                """

            cursor.execute(query, (value, id))
            db.commit()
            cursor.close()

        return {"message": "Update successful"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
