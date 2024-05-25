from fastapi import FastAPI, APIRouter, Query, File, Depends, Form, UploadFile
from pydantic import BaseModel
from typing import List
import mysql.connector
from db_connection import get_db
import pymupdf
import re
key = "sk-proj-DsegDCTknJDBhxyjNBb4T3BlbkFJyLVTxaEpRm0PTKR6qXN7"
from openai import OpenAI
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


def make_gpt_request():
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        ]
    )
    print(completion.choices[0].message)


@router.post("/upload-multiple-pdfs")
async def upload_multiple_pdfs(position: str = Form(...), requirements: str = Form(...), files: List[UploadFile] = File(...), fileGroups: List[int] = Form(...)):

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
    """     text_from_pdfs = []
    text = ''
    document = pymupdf.open(stream=new_arr[0][0], filetype="pdf")
    print(len(document))
    for page in document:
        text += page.get_text()
    text_from_pdfs.append(text)
    document.close()

    print(text_from_pdfs) """

    for group in new_arr:
        text_from_pdfs = []
        for file in group:
            text = read_doc(file)
            clean_text = clear_text(text)
            text_from_pdfs.append(clean_text)
        result.append(text_from_pdfs)

    """ print(result) """

    make_gpt_request()

    return {"message": f"Archivos y datos recibidos correctamente psición: {position}, requerimientos: {requirements}"}
