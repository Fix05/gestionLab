from fastapi import APIRouter, HTTPException, Depends
from datetime import timedelta, datetime, timezone
from fastapi.security import OAuth2PasswordBearer
from db_connection import get_db
from pydantic import BaseModel
from dotenv import load_dotenv
import mysql.connector
import json
import jwt
import os
load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")




key_path = os.getenv("KEYS", '.')
print(key_path)
with open(key_path, 'r') as file:
    data = json.load(file)
    key = data['jwt_key']



SECRET_KEY = key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 5
REFRESH_TOKEN_EXPIRE_DAYS = 30

router = APIRouter()

class User(BaseModel):
    email: str
    password: str

class RefreshData(BaseModel):
    role: str
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str


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
            return {"permission_employee": permission_employee, 
                    "id_employee": id_employee}
        else:
            return {"status_code": 401, "message": "Invalid user or password"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/{id}")
def get_employees(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM employee WHERE id_employee = %s", (id,))
    result = cursor.fetchone()
    cursor.close()
    return result


@router.post("/token")
def login_for_access_token(form_data: User, 
                           db: mysql.connector.MySQLConnection = Depends(get_db)):
    user = validate_user(form_data, db)
    if not user:
        return {"status_code": 401, "message": "Invalid user or password"}
    access_token_expires = timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    token_data = {"sub": user["email"], "id": user["id"], "role": user["permission"]}
    access_token = create_access_token(
        data = token_data,
        expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        data=token_data)
    return {"access_token": access_token, "token_type": "bearer", 
            "refresh_token": refresh_token}


@router.post("/refresh")
def refresh_token(refresh_token: str = Depends(oauth2_scheme), 
                  db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get('role')
        email = payload.get('sub')
        user = validate_refresh({"role": role, "email": email}, db)
        if not user:
            raise HTTPException(status_code=400, detail="Invalid user")
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=400, detail="Invalid token")

    access_token_expires = timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = create_access_token(
        data={"sub": email, "id": user["id"], "role": role},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token
    }


def validate_user(user: User, db):
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT id_employee as id, permission_employee as permission, 
        email_person as email
        FROM employee
        JOIN person ON employee.fk_person = person.id_person
        WHERE employee.pass_employee = %s AND person.email_person = %s
        AND state_employee != 'Deshabilitado';
    """
    cursor.execute(query, (user.password, user.email))
    result = cursor.fetchone()
    cursor.close()
    if result:
        return result 
    else:
        return None
    

def validate_refresh(data: RefreshData, db):
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT id_employee as id
        FROM employee
        JOIN person on id_person = fk_person
        WHERE permission_employee = %s 
        AND person.email_person = %s
        AND state_employee != 'Deshabilitado';
    """
    cursor.execute(query, (data['role'], data['email']))
    result = cursor.fetchone()
    cursor.close()
    if result:
        return result
    else:
        return None
    

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    expire = datetime.now(timezone.utc) + \
        timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


