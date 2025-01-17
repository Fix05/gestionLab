from fastapi import APIRouter, Query, HTTPException, Depends
from datetime import datetime, timedelta
from db_connection import get_db
from pydantic import BaseModel
from typing import List
import mysql.connector
DATE_FORMAT = "%Y-%m-%d"

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
        formated_start = dates.start_date + "-01"
        date = datetime.strptime(formated_start, DATE_FORMAT)
        new_date = date + timedelta(days=32)
        new_date = new_date.replace(day=1)
        formated_end = new_date.strftime(DATE_FORMAT)
        cursor = db.cursor(dictionary=True)
        in_clause = ', '.join(['%s' for _ in roles])
        query = f"""
            SELECT name_person as name, lastname_person as lastname, id_employee,
            base_salary_employee as base_salary, id_remuneration_record as id_payment, date_remuneration as date, state_remuneration as state,
            min_pay_date_remuneration as min_date, max_pay_date_remuneration as max_date, amount_remuneration as amount
            FROM remuneration_record
            INNER JOIN employee on id_employee = remuneration_record.fk_employee
            INNER JOIN person on id_person = fk_person
            WHERE min_pay_date_remuneration >= %s
            AND max_pay_date_remuneration <= %s
            AND permission_employee IN ({in_clause})
            AND state_employee != "Deshabilitado";
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
        

        if result:
            new_date = result['max'] - timedelta(days=22)
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
        for element in result:
            string = f"('{formated_date1}', '{formated_date2}', 'Por pagar', {element['id_employee']}), "
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
            WHERE max_pay_date_remuneration <= CURRENT_DATE()
            AND amount_remuneration != null
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
        if (data.extras):
            cursor.execute(updateExtras, (id,))
        if (data.advances):
            cursor.execute(updateAdvances, (id,))
        db.commit()

    except mysql.connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-payment-info/{id}")
def get_payment_info(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        paymentQuery = f"""
            SELECT date_remuneration, amount_remuneration, description_remuneration, id_remuneration_record
            FROM remuneration_record
            WHERE id_remuneration_record = %s;
        """
        advanceQuery = f"""
            SELECT date_advance, amount_advance, description_advance,
            state_advance, id_advance_record 
            FROM advance_record
            JOIN remuneration_record ON advance_record.fk_remuneration_record = id_remuneration_record
            WHERE id_remuneration_record = %s;
        """
        extraQuery = f"""
            SELECT date_extras, amount_extras, hours_extras, 
            description_extras, state_extra, id_extras_record 
            FROM extras_record
            JOIN remuneration_record ON extras_record.fk_remuneration_record = id_remuneration_record
            WHERE id_remuneration_record = %s;
        """

        queriesList = [{"query": paymentQuery, "name": "payment"}, {
            "query": advanceQuery, "name": "advances"}, {"query": extraQuery, "name": "extras"}]
        result = []
        for query in queriesList:
            cursor.execute(query["query"], (id,))
            query_results = cursor.fetchall()
            if query_results:
                result.append({query["name"]: query_results})
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


@router.get("/paid-extras-and-advances/{id}")
def get_paid_extras_and_advances(id: int, db: mysql.connector.MySQLConnection = Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        Query = f"""
            SELECT 
            (SELECT SUM(amount_extras)
            FROM extras_record 
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record 
            WHERE id_remuneration_record = %s AND state_extra = 'Pagado') AS extra,
            (SELECT SUM(amount_advance)
            FROM advance_record 
            JOIN remuneration_record ON id_remuneration_record = fk_remuneration_record 
            WHERE id_remuneration_record = %s AND state_advance = 'Cobrado') AS advance,
            (SELECT base_salary_employee 
            FROM employee 
            JOIN remuneration_record ON fk_employee = id_employee 
            WHERE id_remuneration_record = %s) AS base_salary;
        """
        cursor.execute(Query, (id, id, id))
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


def run_tasks(execution):
    now = datetime.now()
    last_execution = execution.get_last_execution_date()
    if (now.day == 1 and (last_execution is None or last_execution.month != now.month)):
        insert_data(get_db())
        update_state(get_db())
        execution.set_last_execution_date(now)


async def run_scheduled_task():
    if (datetime.now().second == 10):
        print("Hola")



