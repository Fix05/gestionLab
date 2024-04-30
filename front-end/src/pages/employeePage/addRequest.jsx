import { useState, useEffect } from 'react'
import { EmployeeData, Container, Div, Info } from '../../styledComponents/detailsBox'
import BoxDivider from '../../styledComponents/boxDivider'
import useField from '../../hooks/useField'

export default function AddRequest() {
    
    
    const reazon = useField()
    const document = useField()
    const type = useField()

    const current_date = new Date().toISOString().slice(0, 10)
    
    const [show, setShow] = useState(false); // Estado para controlar si el componente se muestra o no

    useEffect(() => {
        setShow(true); // Cambia el estado a true cuando el componente se monta
    }, []);


    return (

        <div className={`w-full transition duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <EmployeeData className='absolute w-full'>
                <Container className='w-full'>
                    <BoxDivider text={`Crear solicitud`} />
                    <Div className='w-full'>
                        <Info flexbasis={'calc(50% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Razón:</h1>
                            <div className='min-h-6 bg-white mt-2 '>
                                <input autoComplete="off" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                        </Info>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Tipo:</h1>
                            <div className='min-h-6 bg-white mt-2 '>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Escoja un tipo de solicitud</option>
                                    <option value="US">Vacaciones</option>
                                    <option value="CA">Permiso</option>
                                    <option value="FR">Adelanto</option>
                                    <option value="DE">Cambio de horario</option>
                                    <option value="DE">Otro</option>
                                </select>

                            </div>
                        </Info>
                        <Info flexbasis={'calc(25% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Fecha:</h1>
                            <div className='min-h-6 bg-white mt-2 '>
                                <input value={current_date} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                        </Info>
                        <Info flexbasis={'calc(100% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Explicación:</h1>
                            <div className='min-h-28 bg-white mt-2 '>
                                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escriba su explicación aquí"></textarea>
                            </div>
                        </Info>
                        <Info flexbasis={'calc(100% - 10px)'}>
                            <h1 className='text-gray-600 font-bold text-xs'>Sube un archivo:</h1>
                            <input onChange={document.handleChange} className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        </Info>
                    </Div>
                </Container>
            </EmployeeData>

        </div>
    )
}