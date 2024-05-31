from fastapi import HTTPException, APIRouter, File, Form, UploadFile
from dotenv import load_dotenv
from openai import OpenAI
from typing import List
import pymupdf
import json
import re
import os
load_dotenv()

key_path = os.getenv("KEYS", '.')
with open(key_path, 'r') as file:
    data = json.load(file)
    key = data['gpt_key']

client = OpenAI(api_key=key)
router = APIRouter()

def read_doc(file):
    document = pymupdf.open(stream=file, filetype="pdf")
    text = ""
    for page in document:
        text += page.get_text()
    document.close()
    return text


def clear_text(text):
    cleaned_text = re.sub(r'\s+', ' ', text)
    cleaned_text = re.sub(r'\s([?.!,](?:\s|$))', r'\1', cleaned_text)
    return cleaned_text.strip()


def make_gpt_request(cv_list, position, requirements):
    cv_list_json = json.dumps(cv_list)
    tokens = len(cv_list) * 200
    message_content = f"""
        MUY IMPORTANTE LA RESPUEST NO DEBE DE SOBREPASAR LOS {tokens} TOKENS. 
        Basado en esta vacante laboral: {position}, con estos requerimientos: 
        {requirements} dame en formato JSON un diccionario por cada candidato
        a este puesto, el JSON retornado debe de lucir así 
        {{'Nombre del candidato': {{
            'positive': ['...', '...'],
            'negative': ['...', '...'],
            'requirements': ['...', '...'],
            'position': numero
        }},
        'Nombre del candidato': {{
            'positive': ['...', '...'],
            'negative': ['...', '...'],
            'requirements': ['...', '...'],
            'position': numero
        }}}}
    ES MUY IMPORTANTE QUE LA RESPUESTA CONTENGA A TODOS LOS CANDIDATOS.
    siendo 'positive' una lista de los aspectos positivos del candidato 
    en base a la bacante, los requerimientos y el cv, y 'negative' una lista de
    los aspectos negativos del candidato en base a la bacante, los requerimientos
    y el cv, (solo basandose en la información que sí está en los cv,
    si hay algun requerimiento que no se especifica en el cv, puedes poner
    en 'negative' que no se evidencia que cumpla con ese requisito en el cv)
    en 'requirements' debe de haber una lista con los requisitos que cumple, 
    y en 'position' se debe de indicar el porcentaje de requerimientos cumplidos .
    """

    """   gpt-3.5-turbo gpt-4o"""

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        max_tokens=tokens,
        messages=[
            {"role": "system", "content": message_content},
            {"role": "user", "content": cv_list_json}
        ]   
    )
    response_content = completion.choices[0].message.content
    response_dict = json.loads(response_content)
    return response_dict


@router.post("/upload-multiple-pdfs")
async def upload_multiple_pdfs(position: str = Form(...), 
                               requirements: str = Form(...), 
                               files: List[UploadFile] = File(...), 
                               fileGroups: List[int] = Form(...)):

    try:
        new_arr = []
        number_of_groups = max(fileGroups) if fileGroups else 0
        for i in range(number_of_groups+1):
            new_arr.append([])
        for index, group in enumerate(fileGroups):
            file = files[index]
            group_index = int(group)
            file_bytes = await file.read()
            new_arr[group_index].append(bytearray(file_bytes))
        result = []
        for group in new_arr:
            text_from_pdfs = []
            for file in group:
                text = read_doc(file)
                clean_text = clear_text(text)
                text_from_pdfs.append(clean_text)
            result.append(text_from_pdfs)
        response = make_gpt_request(result, position, requirements)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
