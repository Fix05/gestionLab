import GenericModalTemplate from '../../components/genericModalTemplate'
import useFetch from '../../hooks/useFetch'
import {Container} from '../../styledComponents/detailsBox'
import ColorStates from '../../dictionaries/colorStates.json'

export default function EmployeeRequestInfo({ id, open, setOpen }) {

    const REQUEST_INFO_ENDPOINT = `http://127.0.0.1:8000/api/emplyee_requests/get-all-requests-info/${id}`

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
                        <div className='min-h-6 bg-white mt-1 text-sm mr-8 '>
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

                    <div className='grid grid-cols-2 mt-5 rounded-lg border-2 border-slate-300 p-4' style={{backgroundColor:ColorStates[requestInfo.state]}}>

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