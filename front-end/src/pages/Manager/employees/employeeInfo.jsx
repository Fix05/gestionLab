import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useState, useEffect } from 'react'
import UpdateDataModal from '../../../components/updateDataModal'
import dictionary from '../../../dictionaries/employeeInfo.json'
import IconsDictionary from '../../../dictionaries/fileIcons.json'
import { EmployeeData, Container, Div, Info } from '../../../styledComponents/detailsBox'
import DefaultImage from '../../../assets/images/defaultUser-removebg-preview.png'


const Box = styled.div`
&:hover #icono {
    opacity: 1;
  }
`
const Icono = styled.svg`
opacity: 0;
transition: opacity 0.5s ease;
`

export default function EmployeeInfo() {

    const { employeeId } = useParams()
    const EMPLOYEE_DATA_ENDPOINT = `http://127.0.0.1:8000/api/rh/get-all-employee-info/${employeeId}`
    const EMPLOYEE_PHOTO_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-photo/${employeeId}`
    const EMPLOYEE_ID_DOCS_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-identification-documents/Identification/${employeeId}`
    const EMPLOYEE_CONTRACT_DOCS_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-identification-documents/Contract/${employeeId}`
    const [result, doFetch] = useFetch(EMPLOYEE_DATA_ENDPOINT, null, "GET")
    const [idDocs] = useFetch(EMPLOYEE_ID_DOCS_ENDPOINT, null, "GET")
    const [contractDocs] = useFetch(EMPLOYEE_CONTRACT_DOCS_ENDPOINT, null, "GET")
    const [open, setOpen] = useState(false)
    const [field, setField] = useState('')
    const [currentValue, setCurrentValue] = useState('')
    const [hasBeenOpened, setHasBeenOpened] = useState(false)

    const handleClick = (ev) => {

        setCurrentValue(ev.currentTarget.className)
        setField(ev.currentTarget.id);
        setOpen(!open)
        setHasBeenOpened(true)
    }


    useEffect(() => {
        /* ISSUE HERE */
        /*  if (open == false) { */
        doFetch()
        /* } */
    }, [open])

    const handleImgError = (ev) => {
        ev.target.src = DefaultImage
    }

    const getFormat = (name) => {

        const dotIndex = name.lastIndexOf(".") + 1
        const format = name.slice(dotIndex, name.length + 1)
        return format
    }


    return (
        <EmployeeData>
            <Container className='max-h-[355px]'>
                <UpdateDataModal field={field} open={open} setOpen={setOpen} currentValue={currentValue} id={employeeId} doFetch={doFetch} />
                <span className="mt-4 relative flex justify-center">
                    <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
                    ></div>
                    <span className="relative z-10 bg-slate-200 px-6 text-black font-bold text-lg">Datos personales</span>
                </span>

                <Div>
                    <Info>
                        <h1 className='text-gray-600 font-bold text-xs'>Foto:</h1>
                        <Box className='bg-white mt-2 flex justify-center '>
                            <img className=' object-cover w-[100px] h-[100px] border-solid border-4 border-slate-300 rounded-full' src={EMPLOYEE_PHOTO_ENDPOINT}/*  onError={handleImgError}  */alt="" />
                        </Box>
                    </Info>
                    {Object.entries(result).filter((element) => dictionary[element[0]].typeInfo == "personal").map((info, index) => (
                        <Info key={index}>
                            <h1 className='text-gray-600 font-bold text-xs'>{dictionary[info[0]].name}:</h1>
                            <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-600 text-sm ml-2 flex direction-row justify-between items-center'>{info[1]}
                                    <button id={info[0]} className={info[1]} onClick={handleClick} href="">
                                        <Icono xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" id='icono' className="w-4 h-4 transition duration-75 hover:text-sky-800 ">
                                            <path strokeLinecap="round" stroklinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </Icono>
                                    </button>
                                </span>
                            </Box>
                        </Info>
                    ))}
                    <Info>
                        <h1 className='text-gray-600 font-bold text-xs'>Documentos:</h1>
                        <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                            <ul>
                                {idDocs.length > 0 &&
                                    idDocs.map((file) => (
                                        <a href={file.url} download={file.name}>
                                            <li className='text-sm my-[2px] flex items-center'>
                                                <img className='w-[3%] mr-[5px]' src={IconsDictionary[getFormat(file.name)]} alt="" />
                                                <p>{file.name}</p>
                                            </li>
                                        </a>
                                    ))
                                }
                            </ul>
                        </Box>
                    </Info>
                </Div>

                <span className="mt-8 relative flex justify-center">
                    <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
                    ></div>
                    <span className="relative z-10 bg-gray-200 px-6 text-black font-bold text-lg">Datos laborales</span>
                </span>

                <Div>
                    {Object.entries(result).filter((element) => dictionary[element[0]].typeInfo == "professional").map((info, index) => (
                        <Info key={index}>
                            <h1 className='text-gray-600 font-bold text-xs'>{dictionary[info[0]].name}:</h1>
                            <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-600 text-sm ml-2 flex direction-row justify-between items-center'>{info[1]}
                                    <button id={info[0]} className={info[1]} onClick={handleClick} href="">
                                        <Icono xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" id='icono' className="w-4 h-4 transition duration-75 hover:text-sky-800 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </Icono>
                                    </button>
                                </span>
                            </Box>
                        </Info>
                    ))}
                    <h1 className='text-gray-600 font-bold text-xs'>Documentos:</h1>
                            <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <ul>
                                    {contractDocs.length > 0 &&
                                        contractDocs.map((file) => (
                                            <a href={file.url} download={file.name}>
                                                <li className='text-sm my-[2px] flex items-center'>
                                                    <img className='w-[3%] mr-[5px]' src={IconsDictionary[getFormat(file.name)]} alt="" />
                                                    <p>{file.name}</p>
                                                </li>
                                            </a>
                                        ))
                                    }
                                </ul>
                            </Box>
                </Div>
            </Container>
        </EmployeeData>
    )
}