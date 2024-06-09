from fastapi import HTTPException
from db_connection import get_db
import mysql.connector



def update_employee_state(db):
    try:
        cursor = db.cursor(dictionary=True)
        update_to_permission_state_query = f"""
            UPDATE employee
            SET state_employee = 'Permiso'
            WHERE state_employee != "Deshabilitado"
            AND id_employee IN (
                select fk_employee from absences
                WHERE start_date_absence <= DATE(NOW())
                AND end_date_absence >= DATE(NOW())
                AND type_absence != 'Vacaciones'
                AND type_absence != 'Falta injustificada'
            );
        """
        update_to_vacation_state_query = f""" 
            UPDATE employee
            SET state_employee = 'Vacaciones'
            WHERE state_employee != "Deshabilitado"
            AND id_employee IN (
                select fk_employee from absences
                WHERE start_date_absence <= DATE(NOW())
                AND end_date_absence >= DATE(NOW())
                AND type_absence = 'Vacaciones'
            );
        """
        update_to_unjustified_state_query = f""" 
            UPDATE employee
            SET state_employee = 'Ausente'
            WHERE state_employee != "Deshabilitado"
            AND id_employee IN (
                select fk_employee from absences
                WHERE start_date_absence <= DATE(NOW())
                AND end_date_absence >= DATE(NOW())
                AND type_absence = 'Falta injustificada'
            );
        """
        update_to_active_state_query = f""" 
            UPDATE employee
            SET state_employee = 'Activo'
            WHERE state_employee != "Deshabilitado"
            AND id_employee NOT IN (
                select fk_employee from absences
                WHERE start_date_absence <= DATE(NOW())
                AND end_date_absence >= DATE(NOW())
            )
            AND id_employee >0;
        """
        update_to_ended_state_query = f""" 
            UPDATE absences set state_absence = 'Finalizado' 
            where end_date_absence < DATE(NOW())
            and id_absences > 0;
        """
        update_to_inprogress_state_query = f""" 
            UPDATE absences set state_absence = 'En curso' 
            where start_date_absence <= DATE(NOW())
            AND end_date_absence >= DATE(NOW())
            and id_absences > 0;
        """
        cursor.execute(update_to_permission_state_query)
        cursor.execute(update_to_vacation_state_query)
        cursor.execute(update_to_unjustified_state_query)
        cursor.execute(update_to_active_state_query)
        cursor.execute(update_to_ended_state_query)
        cursor.execute(update_to_inprogress_state_query)
        db.commit()
        cursor.close()
        return {"status_code": 200, "message": "Updated successfully"}
    except mysql.connector.Error as e:
        print("Error:", e)
        raise HTTPException(
            status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print("Error:", e)
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
    
update_employee_state(get_db())