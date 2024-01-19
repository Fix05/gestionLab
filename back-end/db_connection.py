import mysql.connector
import os
import json

CREDENTIALS_FILE = os.getenv("DB_CREDENTIALS")

def load_credentials(file_path):
    with open(file_path, 'r') as file:
        credentials = json.load(file)
    return credentials

def get_db():
    credentials = load_credentials(CREDENTIALS_FILE)
    db = mysql.connector.connect(**credentials)
    return db

def close_db(db):
    db.close()
