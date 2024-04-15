from fastapi import FastAPI, APIRouter, Query, HTTPException, Depends
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import List
from contextlib import asynccontextmanager
import mysql.connector
import asyncio
import schedule
import time
import threading
from db_connection import get_db

router = APIRouter()


class PaymentData(BaseModel):
    amount: float
    extras: bool
    advances: bool
    description: str

class Dates(BaseModel):
    start_date: str


@router.post("/get-payment-overall")
def get_payment_overall(dates: Dates, roles: List[str] = Query(['User'], description='List of roles'), db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        DATE_FORMAT = "%Y-%m-%d"
        formated_start = dates.start_date + "-01"
        date = datetime.strptime(formated_start, DATE_FORMAT)
        new_date = date + timedelta(days=32)
        new_date = new_date.replace(day=1)
        formated_end = new_date.strftime(DATE_FORMAT)

        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        # query = f
        """
            SELECT name_person as name, lastname_person as lastname, id_employee, id_salary_info as id_salary,
            base_salary_employee as base_salary, id_remuneration_record as id_payment, date_remuneration as date, state_remuneration as state,
            min_pay_date_remuneration as min_date, max_pay_date_remuneration as max_date, amount_remuneration as amount
            FROM remuneration_record
            INNER JOIN salary_info on remuneration_record.fk_salary_info = id_salary_info
            INNER JOIN employee on id_salary_info = employee.fk_salary_info
            INNER JOIN person on id_person = fk_person
            WHERE min_pay_date_remuneration >= %s
            AND max_pay_date_remuneration <= %s
            AND permission_employee IN ({in_clause});
        """

        query = f"""
            SELECT name_person as name, lastname_person as lastname, id_employee,
            base_salary_employee as base_salary, id_remuneration_record as id_payment, date_remuneration as date, state_remuneration as state,
            min_pay_date_remuneration as min_date, max_pay_date_remuneration as max_date, amount_remuneration as amount
            FROM remuneration_record
            INNER JOIN employee on id_employee = remuneration_record.fk_employee
            INNER JOIN person on id_person = fk_person
            WHERE min_pay_date_remuneration >= %s
            AND max_pay_date_remuneration <= %s
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


@router.get("/payment-date-range")
def get_payment_date_range(db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            SELECT MAX(max_pay_date_remuneration) AS max,
            MIN(min_pay_date_remuneration) AS min
            FROM remuneration_record;
        """

        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()

        DATE_FORMAT = "%Y-%m-%d"

        if result:
            new_date = result['max'] - timedelta(days=22)
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


def insert_data(db):
    try:
        cursor = db.cursor(dictionary=True)
        """ in_clause = ', '.join(['%s' for _ in roles]) """
        query = f"""
            SELECT id_employee
            FROM employee
            WHERE permission_employee IN ('User')
        """
        cursor.execute(query)
        result = cursor.fetchall()

        current_date = datetime.now()
        next_month_date = (current_date + timedelta(days=31)).replace(day=1)
        formated_date1 = current_date.strftime("%Y-%m-%d")
        formated_date2 = next_month_date.strftime("%Y-%m-%d")
        script = ""
        print(result)
        for element in result:
            string = f"('{formated_date1}', '{formated_date2}', 'pagar', {element['id_employee']}), "
            script = script + string

        script = script[:-2] + ";"
        query = f"""
            INSERT INTO remuneration_record
            (min_pay_date_remuneration, max_pay_date_remuneration,
             state_remuneration, fk_employee)
            VALUES {script}
        """

        cursor.execute(query)
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Inserted successfully"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


def update_state(db):
    try:
        cursor = db.cursor(dictionary=True)
        query = f"""
            UPDATE remuneration_record
            SET state_remuneration = 'Atrasado'
            WHERE max_pay_date_remuneration < CURRENT_DATE()
            AND id_remuneration_record > 0;
        """
        cursor.execute(query)
        db.commit()
        cursor.close()

        return {"status_code": 200, "message": "Updated successfully"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/payment-extras-and-advances/{id}")
def get_payment_extras_and_advances(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        totalExtrasQuery = f"""
            SELECT SUM(amount_extras) as amount
            FROM extras_record
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record
            WHERE id_remuneration_record = %s;
        """
        totalAdvancesQuery = f"""
            SELECT SUM(amount_advance) as amount
            FROM advance_record
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record
            WHERE id_remuneration_record = %s;
        """

        cursor.execute(totalExtrasQuery, (id,))
        totalExtras = cursor.fetchone()
        cursor.execute(totalAdvancesQuery, (id,))
        totalAdvances = cursor.fetchone()
        cursor.close()

        if totalExtras["amount"] is not None or totalAdvances["amount"] is not None:
            paymentTotal = {
                "extras": totalExtras["amount"],
                "advances": totalAdvances["amount"]
            }
            return paymentTotal
        else:
            return {"status_code": 407, "message": "No info yet"}
    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.post("/add-new-payment/{id}")
def add_new_payment(id: int, data: PaymentData, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        updatePayment = f"""
            UPDATE remuneration_record
            SET date_remuneration = NOW(),
                amount_remuneration = %s,
                state_remuneration = 'Pagado',
                description_remuneration = %s
            WHERE id_remuneration_record = %s
        """

        updateAdvances = f"""
            UPDATE advance_record
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record
            SET state_advance = 'Cobrado'
            WHERE id_remuneration_record = %s
        """

        updateExtras = f"""
            UPDATE extras_record
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record
            SET state_extra = 'Pagado'
            WHERE id_remuneration_record = %s
        """

        cursor.execute(updatePayment, (data.amount, data.description, id))
        
        if(data.extras):
             cursor.execute(updateExtras, (id,))
        if(data.advances):
             cursor.execute(updateAdvances, (id,))
        
        db.commit()   

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")





def run_tasks():
    if (datetime.now().second == 10):
        print("Hola")
        """ insert_data(get_db())
        update_state(get_db()) """


async def run_scheduled_task():
    while True:
        run_tasks()
        time.sleep(1)


""" insert_data(get_db()) """
