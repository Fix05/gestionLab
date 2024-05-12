import { EmployeeData, Container, Div, Form, Info, GridForm } from '../../../styledComponents/detailsBox'
import useFileInput from '../../../hooks/useFileInput'
import styled from 'styled-components'
import { useState } from 'react'
import BoxDivider from '../../../styledComponents/boxDivider'
import FileInput from '../../../styledComponents/fileInput'
import useField from '../../../hooks/useField'

const Input = styled.input`
max-width: 190px;
display: none;
`


const LabelFile = styled.label`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
width: 250px;
height: 90px;
border: 2px dashed #ccc;
align-items: center;
text-align: center;
padding: 5px;
color: #404040;
cursor: pointer;
`

export default function AddEmployee() {


    /* const [idFiles, idInfolist, idActivated, handleIdFileChange] = useFileInput() */


    const imgFiles = useFileInput()
    const idFiles = useFileInput()



    const fild1 = useField()
    const fild2 = useField()


    const [files1, setFiles1] = useState([])

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        setFiles1([...files1, file])
    }
    const [files2, setFiles2] = useState([])

    const handleFileChange2 = (ev) => {
        const file = ev.target.files[0];
        setFiles2([...files2, file])
    }


    return (
        <EmployeeData className='w-full mt-6'>
            <Container className='w-full'>
                <BoxDivider text={`Datos personales del empleado`} />
                <GridForm>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Nombre:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Apellido:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>N° Cédula o pasaporte:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Correo:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Número telefónico:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Dirección:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Fecha de nacimiento:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Número de emergencia:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Nacionalidad:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Género:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>

                   {/*  <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>PRUEBA:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input onChange={imgFiles.handleFileChange} type="file" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>PRUEBA2:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input onChange={idFiles.handleFileChange} type="file" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info> */}



                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Foto:</h1>
                        <FileInput handleChange={imgFiles.handleFileChange} listActivated={imgFiles.listActivated} list={imgFiles.infoFilelist} id={"image"}/>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Documento de identidad:</h1>
                        <FileInput handleChange={idFiles.handleFileChange} listActivated={idFiles.listActivated} list={idFiles.infoFilelist} id={"id"}/>
                    </Info>




                </GridForm>

                <BoxDivider text={`Datos laborales del empleado`} />

                <GridForm>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Duración del contrato:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Fecha de contratación:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Descripción del contrato:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Beneficios:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Horas de trabajo por día:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Bonus:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Requerimientos del trabajo:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Departamento:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Salario:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Días de vacaciones al año:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>

                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Documentos:</h1>
                        <input className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Foto:</h1>
                        <FileInput />
                    </Info>
                </GridForm>

                <div className='w-full flex justify-center flex-col items-center relative'>
                    {/* <WarningMessage className={'absolute top-[-25px] text-sm'} open={showWarning} setOpen={setShowWarning}> Debe de completar todos los campos </WarningMessage> */}
                    <button
                        type="button"
                        className="my-2 inline-flex w-1/5 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                        Enviar solicitud
                    </button>
                </div>

            </Container>
        </EmployeeData>
    )

}