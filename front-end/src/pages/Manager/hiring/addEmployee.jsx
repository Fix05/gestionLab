import { EmployeeData, Container, Div, Form, Info, GridForm } from '../../../styledComponents/detailsBox'
import useFileInput from '../../../hooks/useFileInput'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import ConfirmAction from '../../../components/confirmAction'
import { useState, useRef, useReducer } from 'react'
import BoxDivider from '../../../styledComponents/boxDivider'
import { useForm } from 'react-hook-form';
import ImgFileInput from '../../../components/imgFileInput'
import SeveralFilesInput from '../../../components/severalFilesInput'
import WarningMessage from '../../../components/warningMessage'
import LoadingModal from '../../../components/loadingModal'
import { useAnimation } from '../../../contexts/doneAnimationContext'
import AddedEmployee from '../../../assets/gif/addedEmployee.gif'
import SlowlyShowing from '../../../components/slowlyShowing'


export default function AddEmployee() {

    const ADD_EMPLOYEE_ENDPOINT = `http://127.0.0.1:8000/api/rh/add-new-employee`
    let ADD_DOCUMENTS_ENDPOINT = `http://127.0.0.1:8000/api/rh/upload-employee-doc/`
    const { id } = useParams()
    const navigate = useNavigate()
    const { setShowAnimation, setGif, setMessage } = useAnimation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, getResult, resultError, resultLoading] = useFetch(ADD_EMPLOYEE_ENDPOINT, {}, "POST", false)
    const [, uploadDocuments, docError, docLoading] = useFetch(ADD_DOCUMENTS_ENDPOINT, {}, "POST", false)
    const imgFiles = useFileInput(true)
    const idFiles = useFileInput(false, 4)
    const contractFiles = useFileInput(false, 4)
    const formData = useRef({})

    const [open, setOpen] = useState(false)
    let fieldsToEvaluate = []


    const manageSubmit = handleSubmit(data => {

        formData.current = data
        fieldsToEvaluate = [idFiles.files, imgFiles.files, contractFiles.files]
        const isAnyFileEmpty = fieldsToEvaluate.some(field => field.length === 0);
        if (isAnyFileEmpty) {
            setOpen(true)
        } else {
            sendData()
        }
    })


    const sendData = async () => {
        let photo = new FormData()
        let idDocuments = new FormData()
        let contractDocuments = new FormData()


        const fillFormData = (form, array) => {
            if (array.length > 0) {
                array.forEach((element) => {
                    form.append('files', element.file)
                })
            }
        }

        fillFormData(idDocuments, idFiles.files)
        fillFormData(contractDocuments, contractFiles.files)
        fillFormData(photo, imgFiles.files)


        getResult(formData.current).then((result) => {

            if (result.status_code == 200) {
                const resultId = result.employe_inserted
                let docsResults = []
                if (Array.from(photo.entries()).length) {
                    uploadDocuments(photo, ADD_DOCUMENTS_ENDPOINT + `Photo/${resultId}`).then((result) => {
                        docsResults = [...docsResults, result.status_code]
                    })
                }
                if (Array.from(idDocuments.entries()).length) {
                    uploadDocuments(idDocuments, ADD_DOCUMENTS_ENDPOINT + `Identification/${resultId}`).then((result) => {
                        docsResults = [...docsResults, result.status_code]
                    })
                }
                if (Array.from(contractDocuments.entries()).length) {
                    uploadDocuments(contractDocuments, ADD_DOCUMENTS_ENDPOINT + `Contract/${resultId}`).then((result) => {
                        docsResults = [...docsResults, result.status_code]
                    })
                }

                const ErrorInDocsUpload = docsResults.some((element) => element != 200)

                if (!ErrorInDocsUpload) {
                    navigate(`/Manager/${id}/employees`);
                    setGif(AddedEmployee)
                    setMessage('Empleado añadido')
                    setShowAnimation(true)
                }
            }
        })

        setOpen(false)
    }

    return (
        <SlowlyShowing time={100}>
            <EmployeeData className='w-full mt-6'>
                <Container className='w-full'>
                    <LoadingModal laoding={resultLoading} text={'Insertando nuevo empleado'} />
                    <ConfirmAction open={open} setOpen={setOpen} positiveAction={() => sendData()} negativeAction={() => setOpen(false)} positiveText={'Aceptar'} negativeText={'Cancelar'}>
                        Hay archivos que no han sido insertados, desea continuar?
                    </ConfirmAction>
                    <BoxDivider text={`Datos personales del empleado`} />
                    <form onSubmit={manageSubmit}>
                        <GridForm >
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Nombre:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input autoComplete="off" {...register("name", { required: true })} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.name && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Apellido:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input autoComplete="off" {...register("lastname", { required: true })} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.lastname && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>N° Cédula o pasaporte:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("dni", { required: true })} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.dni && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Correo:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type={"email"} {...register("email", { required: true })} maxLength={30} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.email && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Número telefónico:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("number", { required: true })} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.number && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Dirección:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("address")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div></div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Fecha de nacimiento:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("birth")} maxLength={30} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div></div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Número de emergencia:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("emergency_number", { required: true })} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.emergency_number && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Nacionalidad:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("nationality")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Género:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("gender")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
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
                                    <input autoComplete="off" {...register("duration_contract", { required: true })} maxLength={20} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.duration_contract && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Fecha de contratación:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input autoComplete="off" {...register("start_day_contract", { required: true })} maxLength={30} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.start_day_contract && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Descripción del contrato:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("description_contract", { required: true })} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.description_contract && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Beneficios:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("benefits_contract")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Horas de trabajo por día:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="number" {...register("hours_per_day", { required: true })} maxLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.hours_per_day && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Bonus:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("bonuses_contract")} maxLength={15} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Requerimientos del trabajo:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("special_requirements")} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Departamento:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="text" {...register("department", { required: true })} maxLength={45} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.department && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Salario:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="number" {...register("salary", { required: true })} maxLength={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.salary && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
                                </div>
                            </Info>
                            <Info >
                                <h1 className='text-gray-600 font-bold text-xs'>Días de vacaciones al año:</h1>
                                <div className='min-h-6 bg-white mt-2 '>
                                    <input type="number" {...register("days_vacation", { required: true })} maxLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    <div className='relative'>
                                        {errors.days_vacation && <span className='absolute top-0 text-red-500 text-xs'>Campo requerido</span>}
                                    </div>
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
                            <button
                                type="submit"
                                className="my-2 inline-flex w-1/5 justify-center rounded-md bg-cyan-800 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
                            >
                                Añadir empleado
                            </button>
                        </div>

                    </form>
                </Container>
            </EmployeeData>
        </SlowlyShowing>
    )
}