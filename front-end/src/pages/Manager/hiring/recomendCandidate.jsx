import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconsDictionary from '../../../dictionaries/fileIcons.json'
import { faX } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

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
    const [candidates, setCandidates] = useState(0)
    const [formData, setFormData] = useState({
        category: '',
        description: '',
    });

    const handleAddCandidate = () => {

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

        console.log(candidate);
        const newFiles = { ...files }
        delete newFiles[candidate]
        setFiles(newFiles)
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const existingFiles = files[event.target.name] ? Array.from(files[event.target.name]) : []
        const newFiles = Array.from(event.target.files)

        setFiles({
            ...files,
            [event.target.name]: [...existingFiles, ...newFiles]
        });
    };

    const removeFile = (index, fileList) => {
        const updatedList = Array.from(files[fileList])
        updatedList.splice(index, 1)
        setFiles({ ...files, [fileList]: updatedList });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        Object.keys(files).forEach(key => {
            Array.from(files[key]).forEach(file => {
                data.append(key, file);
            });
        });
        data.append('category', formData.category);
        data.append('description', formData.description);
        const response = await fetch('http://localhost:8000/upload-multiple-pdfs/', {
            method: 'POST',
            body: data,
        });
        const result = await response.json();
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
        <div>

            <button className='w-[70px] bg-white' onClick={handleAddCandidate}>++++</button>
            <button className='w-[70px] bg-white' onClick={() => setCandidates(candidates + 1)}>+</button>

            <p>{candidates}</p>

            <div className='bg-gray-100 rounded-xl border-solid border-2 border-gray-600'>
                {Object.entries(files).map(([key, list]) => {

                    const name = key
                    console.log(name);
                    return (
                        <div className='relative min-h-[100px] border-dashed border-gray-300 border-b-[1px]'>
                            <button className='absolute right-2 top-2' onClick={() => removeCandidate(name)}><FontAwesomeIcon icon={faX} /></button>
                            <div className='p-5'>
                                <label htmlFor={name} className='p-[5px] bg-blue-200 cursor-pointer rounded border-solid border-gray-300 shadow-sm border-[1px] transition-all text-sm font-semibold hover:bg-blue-300'>
                                    Subir archivo
                                </label>
                                <HiddenFileInput type="file" id={name} name={name} onChange={handleFileChange} multiple accept="application/pdf" />
                                {files[name].length>0 && 
                                <div className='mt-[20px] rounded-xl border-solid border-2 border-gray-600 shadow-md'>
                                    {Object.entries(files[name]).map(([index, file]) => (
                                        <div key={index} className='text-sm bg-gray-50 font-medium flex flex-row justify-between items-center m-2'>
                                            <div className='flex flex-row items-center truncate p-1 w-[700px]'>
                                                <img className='max-w-[30px] mr-[1px]' src={`${getIcon(file.name)}`} alt="" />
                                                <p className='truncate'>{file.name}</p>
                                            </div>
                                            <button onClick={() => removeFile(index, name)}><FontAwesomeIcon icon={faX} /></button>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>)
                })}

            </div>

            {/* <label>
                        PDF Set {index+1}:
                        <input type="file" name={`candidate${index+1}`} multiple onChange={handleFileChange} accept="application/pdf" />
                    </label> */}


        </div>
    );
}

