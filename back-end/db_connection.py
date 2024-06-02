from dotenv import load_dotenv
import mysql.connector
import json
import os

load_dotenv()




def get_db():

    db_parameters = os.getenv("RDS_CREDENTIALS", '.')
    with open(db_parameters, 'r') as file:
        parameters = json.load(file)

    db = mysql.connector.connect(
        host=parameters['host'],
        user=parameters['user'],
        password=parameters['password'],
        database=parameters['database']
    )
    return db

def close_db(db):
    db.close()


