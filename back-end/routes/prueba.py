import json
import os
from dotenv import load_dotenv

load_dotenv()


def soSm():
    key_path = os.getenv("KEYS", '.')
    print(key_path)
    with open(key_path, 'r') as file:
        data = json.load(file)
        key = data['jwt_key']
    print(key)    
soSm()