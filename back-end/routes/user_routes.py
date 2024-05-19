from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from db_connection import get_db

router = APIRouter()

class User(BaseModel):
    email: str
    password: str


@router.post("/")
def validate_user(user: User, db: mysql.connector.MySQLConnection = Depends(get_db)):  
    if not user.email or not user.password:
        return {"status_code": 402, "message": "Missing params"}
    
    try:
        cursor = db.cursor(dictionary=True)
        query = """
            SELECT employee.permission_employee, id_employee 
            FROM employee
            JOIN person ON employee.fk_person = person.id_person
            WHERE employee.pass_employee = %s 
            AND person.email_person = %s
            AND state_employee != "Deshabilitado";
        """
        params = (user.password, user.email)
        cursor.execute(query, params)
        result = cursor.fetchone()
        cursor.close()
        if result:
            permission_employee = result["permission_employee"]
            id_employee = result["id_employee"]
            return {"permission_employee": permission_employee, "id_employee": id_employee}
        else:
            return {"status_code": 401, "message": "Invalid user or password"}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")








@router.get("/{id}")
def get_employees(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM employee WHERE id_employee = %s", (id,))
    result = cursor.fetchone()
    cursor.close()
    return result