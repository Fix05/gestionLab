import { EmployeeData, Container, Info, GridDiv } from '../../../styledComponents/detailsBox'
import { useAnimation } from '../../../contexts/doneAnimationContext'
import ParamsDict from '../../../dictionaries/updateInputParams.json'
import IconsDictionary from '../../../dictionaries/fileIcons.json'
import UpdateDataModal from '../../../components/updateDataModal'
import defaultUser from '../../../assets/images/defaultUser.png'
import dictionary from '../../../dictionaries/employeeInfo.json'
import SlowlyShowing from '../../../components/slowlyShowing'
import ConfirmAction from '../../../components/confirmAction'
import LoadingModal from '../../../components/loadingModal'
import { useParams, useNavigate } from 'react-router-dom'
import DeleteGif from '../../../assets/gif/deleted.gif'
import Loading from '../../../components/loadingModal'
import useFetch from '../../../hooks/useFetch'
import { useState, useEffect } from 'react'
import styled from 'styled-components'


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

    const { id, employeeId } = useParams()
    const navigate = useNavigate()
    const EMPLOYEE_DATA_ENDPOINT = `http://127.0.0.1:8000/api/rh/get-all-employee-info/${employeeId}`
    const EMPLOYEE_PHOTO_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-photo/${employeeId}`
    const EMPLOYEE_ID_DOCS_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-identification-documents/Identification/${employeeId}`
    const EMPLOYEE_CONTRACT_DOCS_ENDPOINT = `http://127.0.0.1:8000/api/rh/download-identification-documents/Contract/${employeeId}`
    const DISABLE_EMPLOYEE_ENDPOINT = `http://127.0.0.1:8000/api/rh/disable-employee/${employeeId}`
    const [result, doFetch, ,loading] = useFetch(EMPLOYEE_DATA_ENDPOINT, null, "GET", true, null, true)
    const [idDocs] = useFetch(EMPLOYEE_ID_DOCS_ENDPOINT, null, "GET")
    const [contractDocs] = useFetch(EMPLOYEE_CONTRACT_DOCS_ENDPOINT, null, "GET")
    const [, disableEmployee, disableError, deletingLoading] = useFetch(DISABLE_EMPLOYEE_ENDPOINT, null, "PUT", false)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [field, setField] = useState('')
    const [inputParams, setInputParams] = useState('')
    const { setShowAnimation, setGif, setMessage } = useAnimation();


    const handleClick = (ev) => {
        setInputParams({
            "placeholder": ev.currentTarget.className,
            "type": ParamsDict[ev.currentTarget.id].type,
            "size": ParamsDict[ev.currentTarget.id].size
        })
        setField(ev.currentTarget.id);
        setOpen(!open)
    }

    const deleteEmployee = () => {
        disableEmployee().then((result) => {
            if (result.status_code == '200') {
                navigate(`/Manager/${id}/employees`);
                setGif(DeleteGif)
                setMessage('Empleado eliminado')
                setShowAnimation(true)
            }
        })
        setOpenDelete(false)
    }

    

    const handleImgError = (ev) => {
        ev.target.src = defaultUser
    }

    const getFormat = (name) => {
        const dotIndex = name.lastIndexOf(".") + 1
        const format = name.slice(dotIndex, name.length + 1)
        return format
    }


    return (
        <>
            <LoadingModal loading={loading} text={''} />
            <EmployeeData className={`mt-6 rounded-lg border-2 border-gray-400 bg-white transition-opacity duration-300 ${loading ? 'opacity-0': 'opacity-100'}`}>
                <Container className='max-h-[355px]'>
                    <ConfirmAction open={openDelete} setOpen={setOpenDelete} positiveAction={() => deleteEmployee()} negativeAction={() => setOpenDelete(false)} positiveText={'Aceptar'} negativeText={'Cancelar'} title={"Desea eliminar este empleado del sistema"}>
                        <div className='flex flex-col'>
                            <p className='flex-wrap w-[290px]'>Está seguro que desea eliminar este empleado del sistema, si continúa todos los datos de este empleado se perderán.</p>
                        </div>

                    </ConfirmAction>
                    <Loading loading={deletingLoading} text={"Eliminando"} />
                    <UpdateDataModal field={field} open={open} setOpen={setOpen} inputParams={inputParams} id={employeeId} reload={doFetch} />
                    <span className="mt-4 relative flex justify-center">
                        <div
                            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
                        ></div>
                        <span className="relative z-10 bg-slate-200 px-6 text-black font-bold text-lg">Datos personales</span>
                    </span>

                    <GridDiv className=''>
                        <Info className='row-span-2'>
                            <h1 className='text-gray-600 font-bold text-xs'>Foto:</h1>
                            <Box className='bg-white mt-2 flex justify-center '>
                                <img className=' object-cover w-[100px] h-[100px] border-solid border-4 border-slate-300 rounded-full' src={EMPLOYEE_PHOTO_ENDPOINT} onError={handleImgError} alt="" />
                            </Box>
                        </Info>
                        {Object.entries(result).filter((element) => dictionary[element[0]].typeInfo == "personal").map((info, index) => (
                            <Info key={index} className='/*  */'>
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
                        <Info className='col-span-4'>
                            <h1 className='text-gray-600 font-bold text-xs'>Documentos:</h1>
                            <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <ul>
                                    {idDocs.length > 0 &&
                                        idDocs.map((file) => (
                                            <a href={file.url} download={file.name}>
                                                <li className='text-sm my-[2px] flex items-center justify-between'>
                                                    <div className='flex flex-row'>
                                                        <img className='w-[3%] mr-[5px]' src={IconsDictionary[getFormat(file.name)]} alt="" />
                                                        <p className='max-w-[600px] truncate'>{file.name}</p>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 26 26" strokeWidth={1.5} stroke="currentColor" className="flex justify-center items-center transition-all hover:text-blue-600 hover:bg-blue-50 rounded-full min-w-[24px] h-6 cursor-pointer ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </li>
                                            </a>
                                        ))
                                    }
                                </ul>
                            </Box>
                        </Info>
                    </GridDiv>

                    <span className="mt-8 relative flex justify-center">
                        <div
                            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
                        ></div>
                        <span className="relative z-10 bg-gray-200 px-6 text-black font-bold text-lg">Datos laborales</span>
                    </span>

                    <GridDiv className='relative'>
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
                        <Info className='col-span-4'>
                            <h1 className='text-gray-600 font-bold text-xs'>Documentos:</h1>
                            <Box className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <ul>
                                    {contractDocs.length > 0 &&
                                        contractDocs.map((file) => (
                                            <a href={file.url} download={file.name}>
                                                <li className='text-sm my-[2px] flex items-center justify-between'>
                                                    <div className='flex flex-row'>
                                                        <img className='w-[3%] mr-[5px]' src={IconsDictionary[getFormat(file.name)]} alt="" />
                                                        <p className='max-w-[600px] truncate'>{file.name}</p>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 26 26" strokeWidth={1.5} stroke="currentColor" className="flex justify-center items-center transition-all hover:text-blue-600 hover:bg-blue-50 rounded-full min-w-[24px] h-6 cursor-pointer ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </li>
                                            </a>
                                        ))
                                    }
                                </ul>
                            </Box>
                        </Info>
                        <button onClick={() => setOpenDelete(true)} className='absolute bottom-0 right-2 text-red-600 text-xs font-bold'>
                            Eliminar empleado
                        </button>

                    </GridDiv>
                </Container>
            </EmployeeData>
        </>
    )
}