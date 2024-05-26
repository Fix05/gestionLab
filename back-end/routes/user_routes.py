from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from fastapi.security import OAuth2PasswordBearer
import jwt
from datetime import timedelta, datetime, timezone
from db_connection import get_db


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "monolosu"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1
REFRESH_TOKEN_EXPIRE_DAYS = 7

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






@router.post("/token")
def login_for_access_token(form_data: User, db: mysql.connector.MySQLConnection = Depends(get_db)):
    user = validate_user(form_data, db)
    print(user)
    if not user:
        return {"status_code": 401, "message": "Invalid user or password"}
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "id": user["id"], "role": user["permission"]}, 
        expires_delta=access_token_expires
    )

    refresh_token = create_refresh_token(data={"sub": user["email"], "id": user["id"]})

    return {"access_token": access_token, "token_type": "bearer", "refresh_token": refresh_token}



@router.post("/refresh")
def refresh_token(refresh_token: str = Depends(oauth2_scheme), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get('role')
        email = payload.get('sub')
        user = validate_refresh({"role": role, "email": email}, db)
        if not user:
            raise HTTPException(status_code=400, detail="Invalid user")
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=400, detail="Invalid token")
    
    print("Pasó")


    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "id": user["id"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token  # Puede optar por emitir un nuevo refresh token aquí
    }



def validate_user(user: User, db):
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT id_employee as id, permission_employee as permission, email_person as email
        FROM employee
        JOIN person ON employee.fk_person = person.id_person
        WHERE employee.pass_employee = %s AND person.email_person = %s
        AND state_employee != 'Deshabilitado';
    """
    cursor.execute(query, (user.password, user.email))
    result = cursor.fetchone()
    cursor.close()
    if result:
        print(result)
        return result  # Retorna el resultado con id, permiso y email
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
        print(result)
        return result  # Retorna el resultado con id, permiso y email
    else:
        return None



def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc)+ timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)