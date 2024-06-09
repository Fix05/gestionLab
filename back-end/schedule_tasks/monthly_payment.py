from fastapi import HTTPException
from datetime import datetime, timedelta
from db_connection import get_db
import mysql.connector
import datetime



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
        current_date = datetime.datetime.now()
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



insert_data(get_db())
update_state(get_db())