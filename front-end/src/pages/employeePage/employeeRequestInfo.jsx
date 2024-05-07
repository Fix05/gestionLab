import GenericModalTemplate from '../../components/genericModalTemplate'
import useFetch from '../../hooks/useFetch'
import { Container } from '../../styledComponents/detailsBox'
import ColorStates from '../../dictionaries/employeeInfoColorStates.json'

export default function EmployeeRequestInfo({ id, open, setOpen }) {

    const REQUEST_INFO_ENDPOINT = `http://127.0.0.1:8000/api/emplyee_requests/get-all-requests-info/${id}`
    const DOWNLOAD_DOC_ENDPOINT = `http://127.0.0.1:8000/api/emplyee_requests/employee-get-request-document/${id}`

    const [requestInfo] = useFetch(REQUEST_INFO_ENDPOINT, null, "GET")

    return (
        <GenericModalTemplate className='' GenericModalTemplate open={open} setOpen={setOpen}>
            <Container className='w-[700px] p-[25px] h-[300px] '>
                <div className='grid grid-cols-3 rounded-lg border-2 border-slate-300 p-4'>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>ID:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 '>
                            {requestInfo.id}
                        </div>
                    </div>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>Estado:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8'>
                            {requestInfo.state}
                        </div>
                    </div>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>Fecha:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 '>
                            {requestInfo.date}
                        </div>
                    </div>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>Tipo:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 '>
                            {requestInfo.type}
                        </div>
                    </div>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>Razón:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 '>
                            {requestInfo.reason}
                        </div>
                    </div>
                    <div className='flex flex-col justify-left mb-7'>
                        <h1 className='text-gray-600 font-bold text-xs'>Documento:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 border-solid border-2 border-slate-100 rounded'>
                            {requestInfo.doc &&
                                <div className='flex flex-row justify-between'>
                                    <p className='max-w-[130px] truncate'>{requestInfo.doc}</p>
                                    <a href={DOWNLOAD_DOC_ENDPOINT}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 26 26" strokeWidth={1.5} stroke="currentColor" className="flex justify-center items-center hover:text-blue-600 hover:bg-blue-50 rounded-full w-5 h-5 cursor-pointer ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col justify-left col-span-3'>
                        <h1 className='text-gray-600 font-bold text-xs'>Explicación:</h1>
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 border-solid border-2 border-slate-100 rounded min-h-12'>
                            {requestInfo.body}
                        </div>
                    </div>

                </div>
                {requestInfo.response &&

                    <div className='grid grid-cols-2 mt-5 rounded-lg border-2 border-slate-300 p-4' style={{ backgroundColor: ColorStates[requestInfo.state] }}>
                        <div className='flex flex-col justify-left mb-7'>
                            <h1 className='text-gray-600 font-bold text-xs'>Respondido por:</h1>
                            <div className='min-h-6 mt-1 text-sm mr-8 '>
                                <p>{requestInfo.name} {requestInfo.lastname}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-left mb-7'>
                            <h1 className='text-gray-600 font-bold text-xs'>Fecha de respuesta:</h1>
                            <div className='min-h-6  mt-1 text-sm mr-8 '>
                                <p>{requestInfo.date_response}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-left mb-7 col-span-3'>
                            <h1 className='text-gray-600 font-bold text-xs'>Respuesta:</h1>
                            <div className='min-h-6 mt-1 text-sm mr-8 border-solid border-2 border-slate-100 rounded min-h-12'>
                                <p>{requestInfo.response}</p>
                            </div>
                        </div>
                    </div>
                }
            </Container>


        </GenericModalTemplate>

    )
}