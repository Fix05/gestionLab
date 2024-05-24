import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconsDictionary from '../../../dictionaries/fileIcons.json'
import { faX } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch'
import Warning from '../../../components/warningMessage'
import { PDFDocument } from 'pdf-lib';
import { EmployeeData, Container, Div, Info, Form, GridDiv, GridDivCand } from '../../../styledComponents/detailsBox'

const HiddenFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export default function RecomendCandidate() {
    const [files, setFiles] = useState({});

    const RECOMENDATION_ENDPOINT = 'http://127.0.0.1:8000/api/ml/upload-multiple-pdfs'
    const [result, getResult] = useFetch(RECOMENDATION_ENDPOINT, null, "POST", false);
    const [candidates, setCandidates] = useState(0)
    const [formData, setFormData] = useState({
        category: '',
        description: '',
    });
    const [openWarning, setOpenWarning] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    const DOCS_PER_CANDIDATE = 4;
    const CANDIDATES_PER_REQUEST = 15

    const handleAddCandidate = () => {
        if (Object.keys(files).length == CANDIDATES_PER_REQUEST) {
            setWarningMessage(`El limite de candidatos es ${CANDIDATES_PER_REQUEST}`)
            setOpenWarning(true)
            return
        }
        if (Object.keys(files).length > 0) {
            const filesKeys = Object.keys(files)
            const lastInserted = filesKeys[filesKeys.length - 1]
            console.log("lastInserted", lastInserted, typeof lastInserted);
            setFiles({
                ...files,
                [+lastInserted + 1]: []
            })
        } else {
            setFiles({
                ...files,
                1: []
            })
        }
    }

    const removeCandidate = (candidate) => {
        const newFiles = { ...files }
        delete newFiles[candidate]
        setFiles(newFiles)
    }

    const decreaseCandidates = () => {
        const candidateKeys = Object.keys(files)
        const keyToREmove = candidateKeys.at(-1)
        removeCandidate(keyToREmove)
    }


    const handleInputChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        });
    };


    const validatePages = async (array) => {

        let fileName = ''
        try {
            for (const file of array) {
                fileName = file.name
                fileName.slice()
                const arrayBuffer = await file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
                const numPages = pdfDoc.getPageCount();

                if (numPages >= 10) {
                    setWarningMessage(`El archivo ${file.name} tienen mas de 10 paginas`)
                    setOpenWarning(true);
                    return false
                }
            }
            return true
        } catch (error) {
            setWarningMessage(`El archivo ${fileName} parece estar dañado`)
            setOpenWarning(true);
            return false
            console.error('Error processing PDF: ', error);
        }
    }

    const handleFileChange = async (ev) => {

        const filesToInsert = ev.target.files.length
        const filesInserted = files[ev.target.name].length


        if ((filesToInsert + filesInserted) > DOCS_PER_CANDIDATE) {
            console.log("NUMNERO DE DOCS");
            setWarningMessage(`El limite de documentos es ${DOCS_PER_CANDIDATE}, por favor intentelo de nuevo`)
            setOpenWarning(true)
            ev.target.value = null;
            return
        }
        const existingFiles = files[ev.target.name] ? Array.from(files[ev.target.name]) : []
        const newFiles = Array.from(ev.target.files)

        const pagesValidation = await validatePages(newFiles)

        if (pagesValidation) {
            setFiles({
                ...files,
                [ev.target.name]: [...existingFiles, ...newFiles]
            });
        }
        ev.target.value = null;
    };

    const removeFile = (index, fileList) => {
        const updatedList = Array.from(files[fileList])
        updatedList.splice(index, 1)
        setFiles({ ...files, [fileList]: updatedList });
    };

    const handleSubmit = async () => {

        const data = new FormData();

        data.append('position', formData.position);
        data.append('requirements', formData.requirements);

        Object.keys(files).forEach((key, listIndex) => {
            files[key].forEach((file, fileIndex) => {
                console.log(file.name, listIndex);
                data.append(`files`, file);
                data.append('fileGroups', listIndex);
            });
        });
        getResult(data)

    };

    const getFormat = (name) => {
        const dotIndex = name.lastIndexOf(".")
        return name.slice(dotIndex + 1)
    }

    function getIcon(fileName) {
        const format = getFormat(fileName);
        return IconsDictionary[format];
    }



    return (
        <EmployeeData className='relative'>
            <Container >
                <Warning open={openWarning} setOpen={setOpenWarning} className={'absolute top-0 bg-red-50 p-[5px] w-[400px] overflow-hidden rounded shadow font-semibold'}>
                       <p className='break-words'>{warningMessage}</p> 
                </Warning>
                <Div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <Info className='w-1/3'>
                            <h1 className='text-gray-600 font-bold text-xs'>Puesto:</h1>
                            <input type="text" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='position' />
                        </Info>
                        <Info className='w-1/3'>
                            <h1 className='text-gray-600 font-bold text-xs'>Número de candidatos:</h1>
                            <div className='flex flex-row'>
                                <button className='w-[70px] bg-red-300 rounded' onClick={decreaseCandidates}>-</button>
                                <input type='number' min={2} max={15} value={Object.keys(files).length} className="bg-gray-50 border mx-2 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <button className='w-[70px] bg-green-300 rounded' onClick={handleAddCandidate}>+</button>
                            </div>
                        </Info>
                    </div>
                    <Info>
                        <h1 className='text-gray-600 font-bold text-xs'>Descripción del puesto:</h1>
                        <textarea onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='requirements' />
                    </Info>
                </Div>
                <GridDivCand>
                    {Object.entries(files).map(([key, list]) => {
                        const name = key
                        return (
                            <Info className='relative min-h-[100px] border-dashed border-gray-300 border-[1px]'>
                                <button className='absolute right-2 top-0' onClick={() => removeCandidate(name)}><FontAwesomeIcon icon={faX} size="xs" style={{ color: "#a8a8a8", }} /></button>
                                <div className='p-5'>
                                    <p>Candidato {key}</p>
                                    <label htmlFor={name} className='p-[5px] bg-blue-300 cursor-pointer rounded  transition-all text-sm font-semibold hover:shadow-md'>
                                        Subir archivo
                                    </label>
                                    <HiddenFileInput type="file" id={name} name={name} onChange={handleFileChange} max={4} multiple accept="application/pdf" />
                                    {files[name].length > 0 &&
                                        <div className='mt-[20px] rounded-xl bg-gray-50 border-gray-200 border-solid border-[1px] shadow'>
                                            {Object.entries(files[name]).map(([index, file]) => (
                                                <div key={index} className='text-sm bg-transparent font-medium flex flex-row justify-between items-center m-2'>
                                                    <div className='flex flex-row items-center truncate p-1'>
                                                        <img className='max-w-[30px] mr-[1px]' src={`${getIcon(file.name)}`} alt="" />
                                                        <p className='truncate max-w-[300px]'>{file.name}</p>
                                                    </div>
                                                    <button onClick={() => removeFile(index, name)}><FontAwesomeIcon icon={faX} size="xs" style={{ color: "#a8a8a8", }} /></button>
                                                </div>
                                            ))}
                                        </div>}
                                </div>
                            </Info>)
                    })}

                    <button onClick={handleSubmit} >SUBMIT</button>


                </GridDivCand>
            </Container>
        </EmployeeData>
    );
}

