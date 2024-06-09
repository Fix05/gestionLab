import { EmployeeData, Container, Div, Info } from '../../../styledComponents/detailsBox'
import SetResponseModal from '../../../components/setResponseModal'
import DoneAnimation from '../../../components/doneAnimationWindow'
import SendedResponse from '../../../assets/gif/sendedResponse.gif'
import BoxDivider from '../../../styledComponents/boxDivider'
import LoadingModal from '../../../components/loadingModal'
import useField from '../../../hooks/useField'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'


const Button = styled.button`
span {
    transition: background-color 0.3s ease; /* Añadir transición a background-color */
  }
`
const Svg = styled.svg`
transition: background-color 0.3s ease;
`
const Textarea = styled.textarea`
resize: none;
outline: none;
`

export default function RequestInfo() {

    const [activeButton, setActiveButton] = useState(null);
    const { requestId } = useParams()
    const REQUEST_INFO_ENDPOINT = `http://18.119.103.188:8000/api/employee/get-all-request-info/${requestId}`
    const REQUEST_DOC_ENDPOINT = `http://18.119.103.188:8000/api/employee/get-request-document/${requestId}`
    const [result, doFetch, , loading] = useFetch(REQUEST_INFO_ENDPOINT, null, "GET", true, null, true)
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [openDone, setOpenDone] = useState(false)
    const rquestResponse = useField()

    const handleSubmit = (ev) => {

        /* Maybe can be enhanced */
        if (rquestResponse.field == "") {
            setErrorMessage('Debe escribir una respuesta a la solicitud')
        } else if (!activeButton) {
            setErrorMessage('Debe marcar si la solicitud será denegada o aprobada')
        } else {
            setErrorMessage('')
            setOpen(true)
        }

    }

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    return (
        <>
            <LoadingModal loading={loading} text={''} />
            <DoneAnimation open={openDone} setOpen={setOpenDone} message={"Respuesta enviada"} gif={SendedResponse}/>
            <EmployeeData className={`transition-opacity duration-300 ${loading ? 'opacity-0': 'opacity-100'}`}>
                <Container>
                    <SetResponseModal open={open} setOpen={setOpen} action={activeButton} body={rquestResponse.field} requestId={requestId} reloadInfo={doFetch} setOpenDone={setOpenDone}/>
                    <BoxDivider text={`Solicitud Nº${requestId}`} />

                    <Div>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Empleado:</h1>
                            <div className='min-h-6 bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-800 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {`${result.name} ${result.lastname}`}
                                </span>
                            </div>
                        </Info>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Razón:</h1>
                            <div className='min-h-6 bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-800 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {result.reason}
                                </span>
                            </div>
                        </Info>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Tipo:</h1>
                            <div className='min-h-6 bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-800 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {result.type}
                                </span>
                            </div>
                        </Info>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Fecha:</h1>
                            <div className='min-h-6 bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-800 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {result.date}
                                </span>
                            </div>
                        </Info>
                        <Info flexbasis={'calc(100% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Explicación:</h1>
                            <div className='min-h-28 bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                <span className='text-gray-800 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {result.explanation}
                                </span>
                            </div>
                        </Info>

                        {result.doc &&
                            <Info flexbasis={'calc(100% - 10px)'}>
                                <h1 className='text-gray-600 font-bold text-xs'>Documento:</h1>
                                <div className='bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                    <span className='text-gray-600 text-sm ml-2 flex direction-row justify-between items-center'>
                                        <p className='truncate w-[500px]'>{result.doc}</p>
                                        <a href={REQUEST_DOC_ENDPOINT}>
                                            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 26 26" strokeWidth={1.5} stroke="currentColor" className="flex justify-center items-center hover:text-blue-600 hover:bg-blue-50 rounded-full w-6 h-6 cursor-pointer ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </Svg>
                                        </a>
                                    </span>
                                </div>
                            </Info>
                        }

                        {result.state == "Esperando" ? (
                            <>
                                <Info flexbasis={'calc(100% - 10px)'}>
                                    <h1 className='text-gray-600 font-bold text-xs'>Respuesta:</h1>
                                    <div className='flex bg-white mt-2 border-solid border-2 border-slate-300 rounded'>
                                        <Textarea
                                            id="OrderNotes"
                                            className="w-full rounded border-slate-300 align-top shadow-sm sm:text-sm"
                                            rows="4"
                                            placeholder="Escribe la respuesta a la solicitud."
                                            maxLength={490}
                                            onChange={rquestResponse.handleChange}
                                        ></Textarea>

                                        <div className='flex flex-col justify-between w-20'>
                                            <Button onClick={() => handleClick("Aprobado")} className={` flex-1 justify-center group relative inline-block text-sm font-medium text-stone-500`}>
                                                <span className={`${activeButton === "Aprobado" ? 'bg-green-800 text-white' : 'bg-gray-100'} block border border-gray-400 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-tr`}>
                                                    Aprobar
                                                </span>
                                            </Button>
                                            <Button onClick={() => handleClick("Denegado")} className={`flex-1 group relative inline-block text-sm font-medium text-stone-500`}>
                                                <span className={`${activeButton === "Denegado" ? 'bg-red-800 text-white' : 'bg-gray-100'} block border border-gray-400 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-br transition duration-75`}>
                                                    Denegar
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                    <span className='flex justify-center text-xs text-red-700'>{errorMessage}</span>
                                </Info>

                                <Info className='items-center'>
                                    <button onClick={handleSubmit} className="flex items-center justify-center w-24 h-8 inline-block rounded bg-teal-700 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl active:bg-teal-800 transition-all hover:translate-x-[1px] hover:translate-y-[1px]">
                                        Enviar
                                    </button>
                                </Info>
                            </>
                        ) : <Info flexbasis={'calc(100% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Respuesta:</h1>
                            <div className='bg-white mt-2 border-solid border-2 border-slate-300 rounded min-h-24 relative'>
                                <span className='text-gray-600 text-sm ml-2 flex direction-row justify-between items-center'>
                                    {result.response}
                                </span>

                                {/* This is better */}
                                {/* <span className={`text-gray-600 text-sm ml-2 flex direction-row justify-between items-center absolute bottom-0 right-0 ${result.state == "Denegado" ? 'bg-red-200' : 'bg-green-200'} rounded-tl px-1`}>
                                {result.state == "Denegado" ? "Solicitud denegada" : "Solicitud aceptada"} el día {result.date_response ? result.date_response.replace("T", " ") : null}
                            </span> */}

                                {/* This is not necesary */}
                                {result.state == "Denegado" ? (
                                    <span className={`text-gray-600 text-sm ml-2 flex direction-row justify-between items-center absolute bottom-0 right-0 bg-red-200 rounded-tl px-1`}>
                                        Solicitud denegada {result.date_response ? `el día ${result.date_response.replace("T", " ")}` : null}
                                    </span>
                                ) :
                                    <span className={`text-gray-600 text-sm ml-2 flex direction-row justify-between items-center absolute bottom-0 right-0 bg-green-200 rounded-tl px-1`}>
                                        Solicitud aprobada {result.date_response ? `el día ${result.date_response.replace("T", " ")}` : null}
                                    </span>
                                }

                            </div>
                        </Info>}
                    </Div>
                </Container>
            </EmployeeData>
        </>
    )
}
