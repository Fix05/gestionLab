import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { EmployeeData, Container, Div, Info, Form } from '../../styledComponents/detailsBox'
import BoxDivider from '../../styledComponents/boxDivider'
import WarningMessage from '../../components/warningMessage'
import useField from '../../hooks/useField'
import useFetch from '../../hooks/useFetch'


export default function AddRequest() {

    const { id } = useParams()
    const ADD_REQUEST_ENDPOINT = `http://18.119.103.188:8000/api/emplyee_requests/add-new-request/${id}`
    const [, addRequest] = useFetch(ADD_REQUEST_ENDPOINT, null, 'POST', false)
    const reason = useField()
    const explanation = useField()
    const type = useField()
    const [files, setFiles] = useState()
    const current_date = new Date().toISOString().slice(0, 10)
    const [showWarning, setShowWarning] = useState(false)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShow(true);
    }, []);

    const [, setShowAnimationWindow] = useOutletContext()

    const handleFileChange = (ev) => {
        setFiles(ev.target.files[0])
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const formData = new FormData()
        const fields = [reason.field, explanation.field, type.field]

        if (fields.every(field => field)) {
            formData.append('type', type.field)
            formData.append('explanation', explanation.field)
            formData.append('reason', reason.field)
            files ? formData.append('file', files) : null

            addRequest(formData).then((result) => {
                if (result.status_code == 200) {
                    setShowAnimationWindow(true)
                    navigate(`/User/${id}/recordRequest`)
                }
            })
        } else {
            setShowWarning(true)
        }
    }


    return (
        <div className={`w-full transition duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <EmployeeData height={'380px'} className='absolute w-full'>
                <Container height={'350px'} className='w-full'>
                    <BoxDivider text={`Crear solicitud`} />

                    <Form className='w-full' onSubmit={handleSubmit}>
                            <Info flexbasis={'calc(50% - 10px)'}>
                                <h1 className='text-gray-600 font-bold text-xs'>Razón:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input onChange={reason.handleChange} autoComplete="off" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info flexbasis={'calc(25% - 10px)'}>
                                <h1 className='text-gray-600 font-bold text-xs'>Tipo:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <select onChange={type.handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Escoja un tipo de solicitud</option>
                                        <option value="Vacaciones">Tomar días de vacaciones</option>
                                        <option value="Permiso">Permiso</option>
                                        <option value="Adelanto">Adelanto</option>
                                        <option value="Cambio de Horario">Cambio de horario</option>
                                        <option value="Reclamación">Reclamación</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </Info>
                            <Info flexbasis={'calc(25% - 10px)'}>
                                <h1 className='text-gray-600 font-bold text-xs'>Fecha:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input value={current_date} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info flexbasis={'calc(100% - 10px)'}>
                                <h1 className='text-gray-600 font-bold text-xs'>Explicación:</h1>
                                <div className='min-h-28 bg-white mt-2 '>
                                    <textarea onChange={explanation.handleChange} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escriba su explicación aquí"></textarea>
                                </div>
                            </Info>
                            <Info flexbasis={'calc(100% - 10px)'} className=''>
                                <h1 className='text-gray-600 font-bold text-xs'>Sube un archivo:</h1>
                                <input onChange={handleFileChange} className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            </Info>
                        <div className='w-full flex justify-center flex-col items-center relative'>
                        <WarningMessage className={'absolute top-[-25px] text-sm'} open={showWarning} setOpen={setShowWarning}> Debe de completar todos los campos </WarningMessage>
                            <button
                                type="button"
                                className="my-2 inline-flex w-1/5 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                                onClick={handleSubmit}
                            >
                                Enviar solicitud
                            </button>
                        </div>
                    </Form>
                </Container>
            </EmployeeData>
        </div>
    )
}