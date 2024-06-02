from fastapi import APIRouter, Query, HTTPException, Depends, Form, UploadFile, File
from extra_functionalities.send_mail import send_email
from fastapi.responses import FileResponse
from db_connection import get_db
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime
from typing import List
import mysql.connector
import traceback
import random
import shutil
import uuid
import json
import time
import os
load_dotenv()

router = APIRouter()

class NewEmployee(BaseModel):
    name: str
    lastname: str
    dni: str
    email: str
    number: str
    address: str
    birth: str
    emergency_number: str
    nationality: str
    gender: str
    duration_contract: str
    hours_per_day: int
    start_day_contract: str
    special_requirements: str
    description_contract: str
    benefits_contract: str
    bonuses_contract: str
    days_vacation: int
    salary: float
    department: str


with open('./src/dictionaries/table_fields.json', 'r') as file:
    FIELD_TO_TABLE_MAPPING = json.load(file)

""" FIELD_TO_TABLE_MAPPING = {
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
} """

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
            AND employee.state_employee != "Deshabilitado";
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
            department_employee, state_employee, base_salary_employee,
            days_vacation
            FROM person
            JOIN employee on id_person = fk_person
            JOIN contract on fk_contract = id_contract
            WHERE id_employee = %s
            AND state_employee != "Deshabilitado";
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

# Update employee info
@router.put("/update-employee-info/{id}")
def update_employee_info(id: int, updated_data: dict, db: mysql.connector.MySQLConnection = Depends(get_db)):
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


@router.post("/add-new-employee")
def add_new_employee(data: NewEmployee, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        found_user = validate_email(data.email, db)
        if len(found_user) > 0:
            return {"status_code": 411, "message": "Email already in use"}
        add_person_query = f"""
            INSERT INTO person (name_person, lastname_person, dni_person,
            email_person, number_person, address_person, birth_date_person,
            emergency_number, nationality_person, gender_person)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        add_contract_query = f"""
            INSERT INTO contract (duration_contract, hours_per_day,
            benefits_contract, start_day_contract, special_requirements,
            bonuses_contract, description_contract, days_vacation)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        add_salary_info_query = f"""
            INSERT INTO salary_info (base_salary)
            VALUES (%s)
        """
        add_employee_query = f"""
            INSERT INTO employee (pass_employee, permission_employee, department_employee, fk_person, fk_contract, fk_salary_info,  state_employee,  base_salary_employee)
            VALUES (%s, 'User', %s, @last_person_id, @last_contract_id, @last_salary_id, 'Activo', %s)
        """
        password = generate_random_code()
        cursor.execute(add_person_query, (data.name, data.lastname, data.dni,
                                          data.email, data.number, data.address,
                                          data.birth, data.emergency_number,
                                          data.nationality, data.gender))
        cursor.execute("SET @last_person_id = LAST_INSERT_ID();")
        cursor.execute(add_contract_query, (data.duration_contract, data.hours_per_day,
                                            data.benefits_contract, data.start_day_contract,
                                            data.special_requirements, data.bonuses_contract,
                                            data.description_contract, data.days_vacation))
        cursor.execute("SET @last_contract_id = LAST_INSERT_ID();")
        cursor.execute(add_salary_info_query, (data.salary,))
        cursor.execute("SET @last_salary_id = LAST_INSERT_ID();")
        cursor.execute(add_employee_query, (password, data.department, data.salary))
        employee_id = cursor.lastrowid
        db.commit()
        send_email(data.email, f"{data.name} {data.lastname}", password)
        if(employee_id):
            return {"status_code": 200, "employe_inserted": employee_id}
        else:
            return {"status_code": 403, "message": "Not found"}
    except mysql.connector.Error as e:
        print("Error:", e)
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print("Error:", e)
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    finally:
        cursor.close()

@router.post("/upload-employee-doc/{list_id}/{employee_id}")
def upload_new_document(list_id: str, employee_id: int, files: List[UploadFile] = File(...), db: mysql.connector.MySQLConnection = Depends(get_db)):
    download_folder = os.getenv("EMPLOYEE_DOCUMENTS_DIRECTORY", '.')
    try:
        cursor = db.cursor(dictionary=True)
        current_date = datetime.now()
        verification_query = f"""
            SELECT id_employee
            FROM employee where id_employee = %s;
        """
        add_doc_query = f"""
            INSERT INTO employee_documents (name_employee_document, fk_employee, type_employee_documents, path_employee_documents)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(verification_query, (employee_id,))
        verification = cursor.fetchone()
        if (verification is not None):
            for file in files:
                format = '.'+(file.filename.rsplit('.', 1)[1])
                unique_code = f"{current_date.strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}"
                file_path = f"{download_folder}/{unique_code+format}"
                with open(file_path, "wb") as new_file:
                    shutil.copyfileobj(file.file, new_file)
                cursor.execute(add_doc_query, (file.filename,
                               employee_id, list_id, file_path))
        else:
            return {"status_code": 403, "message": "Not found"}
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Inserted successfully"}

    except mysql.connector.Error as e:
        print("Error:", e)
        traceback.print_exc()
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print("Error:", e)
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/download-photo/{id}")
async def download_employee_photo(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT path_employee_documents as file_path, name_employee_document as file_name
            FROM employee_documents
            WHERE fk_employee = %s
            AND type_employee_documents = 'Photo';
        """
        cursor.execute(query, (id,))
        path = cursor.fetchone()
        cursor.close()
        if path:
            return FileResponse(path=f"{path['file_path']}", media_type='image/jpeg', filename=f"{path['file_name']}")
        else:
            return {"status_code": 406, "message": "Not found"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    

@router.get("/download-identification-documents/{doc_type}/{id}")
async def download_employee_identification_documents(doc_type: str, id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT path_employee_documents as file_path, name_employee_document as file_name
            FROM employee_documents
            WHERE fk_employee = %s
            AND type_employee_documents = %s;
        """
        cursor.execute(query, (id, doc_type))
        files = cursor.fetchall()
        cursor.close()
        if files:
            files_info = [
                {
                    "url": f"http://127.0.0.1:8000/employeeDocuments/{file['file_path'].split('/')[-1]}",
                    "name": file['file_name']
                }
                for file in files
            ]
            return files_info
        else:
            return {"status_code": 406, "message": "Not found"}

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.put("/disable-employee/{id}")
def disble_employee(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            UPDATE employee 
            SET state_employee = "Deshabilitado"
            WHERE id_employee = %s;
        """
        cursor.execute(query, (id,))
        db.commit()
        cursor.close()
        time.sleep(4)
        return {"status_code": 200, "message": "Employee disabled"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    
def generate_random_code():
    code = random.randint(10000000, 99999999)
    return code
def validate_email(email: str, db):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT id_person
            FROM person
            JOIN employee ON id_person = fk_person
            WHERE email_person = %s
            AND state_employee != "Deshabilitado";
        """
        cursor.execute(query, (email,))
        user = cursor.fetchall()
        return (user)
    finally:
        cursor.close()


    
        
