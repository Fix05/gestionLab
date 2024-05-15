import { EmployeeData, Container, Div, Form, Info, GridForm } from '../../../styledComponents/detailsBox'
import useFileInput from '../../../hooks/useFileInput'
import useFetch from '../../../hooks/useFetch'
import ConfirmAction from '../../../components/confirmAction'
import { useState } from 'react'
import BoxDivider from '../../../styledComponents/boxDivider'
import { useForm } from 'react-hook-form';
import ImgFileInput from '../../../components/imgFileInput'
import SeveralFilesInput from '../../../components/severalFilesInput'
import WarningMessage from '../../../components/warningMessage'

export default function AddEmployee() {


    const { register, handleSubmit, errors } = useForm();
    const imgFiles = useFileInput(true)
    const idFiles = useFileInput(false, 4)
    const contractFiles = useFileInput(false, 4)
    const [noFieldsAcepted, setNoFieldsAcepted] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClick = () => {

        const form = new FormData()

        const fieldsToEvaluate = [idFiles.files, imgFiles.files, contractFiles.files]
        const isAnyFileEmpty = fieldsToEvaluate.some(field => field.length === 0);

        if(isAnyFileEmpty){
            setOpen(true)
        }else{
            sendData()
        }


    }

    const manageSubmit = (ev) => {

        /* verify if  */

        /* submit => get id and doFetch with id in params */
    }


    const sendData = () => { 

    }

    return (
        <EmployeeData className='w-full mt-6'>
            <Container className='w-full'>
                <ConfirmAction open={open} setOpen={setOpen}>
                    Hay archivos que no han sido insertados
                </ConfirmAction>
                <BoxDivider text={`Datos personales del empleado`} />
                <GridForm onSubmit={/* handleSubmit( */manageSubmit/* ) */}>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Nombre:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" {...register("name")} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Apellido:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" {...register("lastname")} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>N° Cédula o pasaporte:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("dni")} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Correo:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type={"email"} {...register("email")} maxLength={30} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Número telefónico:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("number")} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Dirección:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("address")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Fecha de nacimiento:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("birth")} maxLength={30} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Número de emergencia:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("emergency_number")} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Nacionalidad:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("nationality")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Género:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("gender")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>



                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Foto:</h1>
                        <ImgFileInput handleChange={imgFiles.handleFileChange} listActivated={imgFiles.listActivated} list={imgFiles.infoFilelist} image={imgFiles.previewImage} id={"image"} />
                        <p>{imgFiles.error}</p>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Documento de identidad:</h1>
                        <div className='flex flex-col justify-center'>
                            <SeveralFilesInput handleChange={idFiles.handleFileChange} listActivated={idFiles.listActivated} list={idFiles.infoFilelist} deleteFile={idFiles.removeFromFiles} id={"id"} />
                            <WarningMessage className={'text-xs mt-[10px] w-[250px] h-0'} setOpen={idFiles.setShowError} open={idFiles.showError}> {idFiles.error} </WarningMessage>
                        </div>
                    </Info>





                </GridForm>

                <BoxDivider text={`Datos laborales del empleado`} />

                <GridForm>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Duración del contrato:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" {...register("duration_contract")} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Fecha de contratación:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input autoComplete="off" {...register("start_day_contract")} maxLength={30} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Descripción del contrato:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("description_contract")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Beneficios:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("benefits_contract")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Horas de trabajo por día:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="number" {...register("hours_per_day")} maxLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Bonus:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("bonuses_contract")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Requerimientos del trabajo:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("special_requirements")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Departamento:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("department")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Salario:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="text" {...register("salary")} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>
                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Días de vacaciones al año:</h1>
                        <div className='min-h-6 bg-white mt-2 '>
                            <input type="number" {...register("days_vacation")} maxLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                    </Info>

                    <Info >
                        <h1 className='text-gray-600 font-bold text-xs'>Documento del contrato:</h1>
                        <div className='flex flex-col justify-center'>
                            <SeveralFilesInput handleChange={contractFiles.handleFileChange} listActivated={contractFiles.listActivated} list={contractFiles.infoFilelist} deleteFile={contractFiles.removeFromFiles} id={"contract"} />
                            <WarningMessage className={'text-xs mt-[10px] w-[250px] h-0'} setOpen={contractFiles.setShowError} open={contractFiles.showError}> {contractFiles.error} </WarningMessage>
                        </div>
                    </Info>

                </GridForm>

                <div className='w-full flex justify-center flex-col items-center relative'>
                    {/* <WarningMessage className={'absolute top-[-25px] text-sm'} open={showWarning} setOpen={setShowWarning}> Debe de completar todos los campos </WarningMessage> */}
                    <button
                        onClick={handleClick}
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