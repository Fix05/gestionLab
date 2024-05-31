import { useState, useEffect, useRef } from 'react'
import { format, isWeekend, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import useFetch from '../../../hooks/useFetch'
import useField from '../../../hooks/useField'
import ModalTemplate from '../pageComponents/modalTemplate'
import Modal from '../../../components/modal'
import DateeRangePicker from '../../../components/dateRangePicker'
import GenericModalTemplate from '../../../components/genericModalTemplate'
import WarningMessage from '../../../components/warningMessage'

export default function AddVacationModal({ open, setOpen, id, employeeData, setAnimation, reloadList }) {

    const HEADER = "Registro de vacaciones o ausencias"
    const BUTTON_TEXT = "Registrar ausencia"
    const DAYS_LEFT_ENDPOINT = `http://127.0.0.1:8000/api/vacations/get-vacation-days-left/${id}`
    const ADD_VACATION_ENDPOINT = `http://127.0.0.1:8000/api/vacations/insert-new-absence/${id}`
    const [daysLeft, getDaysLeft] = useFetch(DAYS_LEFT_ENDPOINT, null, "GET")
    const [addingResult, addVacation, addingError] = useFetch(ADD_VACATION_ENDPOINT, {}, "POST", false)
    const [newDaysLeft, setNewDaysLeft] = useState()
    const [pickedDays, setPickedDays] = useState()
    const type = useField()
    const reason = useField()
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [formatedRange, setFormatedRange] = useState({})
    const [warningMessage, setWarningMessage] = useState(false)
    const [range, setRange] = useState([{
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    }]);
    

    const getDays = () => {
        let count = 0;
        let day = range[0].startDate;
        while (day <= range[0].endDate) {
            if (!isWeekend(day)) {
                count++;
            }
            day = addDays(day, 1);
        }
        return count;
    }

    const resetFormatedRange = () => {
        setFormatedRange({
            start: format(new Date(), 'yyyy/MM/dd', { locale: es }),
            end: ""
        })
    }


    const handleSubmit = () => {
        if (range[0].endDate && type.field && reason.field) {
            setWarningMessage(false)
            const dataToLoad = {
                startDate: range[0].startDate,
                endDate: range[0].endDate,
                description: reason.field,
                type: type.field,
                days: pickedDays,
            }

            addVacation(dataToLoad).then(() => {
                getDaysLeft()
                reloadList()
            })
        } else {
            setWarningMessage(true)
        }

    }

    useEffect(() => {
        if (Object.keys(addingResult).length > 0) {
            if (addingError) {
                setAlertMessage(addingError)
                setOpenAlert(true)
            } else {
                setOpen(false)
                setAnimation(true)
            }
        }
    }, [addingResult])


    const handleDatePicker = () => {
        setOpenDatePicker((prevstate) => !prevstate)
    }


    useEffect(() => {
        setFormatedRange({
            start: format(range[0].startDate, 'yyyy/MM/dd', { locale: es }),
            end: range[0].endDate ? format(range[0].endDate, 'yyyy/MM/dd', { locale: es }) : ""
        })
        const days = getDays()
        setPickedDays(days)

        if (type.field == "Vacaciones") {
            if ((daysLeft.days_left - days) < 0) {
                setAlertMessage(`El empleado no tiene tantos días de vacaciones,
                le quedan ${daysLeft.days_left} días, el rango de fecha que elegiste tiene ${days} días`)
                console.log(("If open alert"));
                setOpenAlert(true)
                setRange([{
                    startDate: new Date(),
                    endDate: null,
                    key: 'selection'
                }])
                resetFormatedRange()
            } else {
                setPickedDays(days)
                setNewDaysLeft(daysLeft.days_left - days)
            }
        } else {
            setNewDaysLeft()
        }
    }, [openDatePicker, type.field, range])


    useEffect(() => {
        type.setField("")
        setPickedDays()
        resetFormatedRange()
        setRange([{
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }])
        setWarningMessage(false)
    }, [open])


    return (
        <ModalTemplate open={open} setOpen={setOpen} header={HEADER} employeeData={employeeData} handleClick={handleSubmit} buttonText={BUTTON_TEXT}>
            <Modal open={openAlert} setOpen={setOpenAlert} header={"Tenemos un problema!!"} text={alertMessage} />
            <div className='flex flex-wrap self-start mb-4 text-sm'>
                <div className='flex flex-row mr-4'>
                    <p className='font-medium '>Empleado:&nbsp;&nbsp;</p>
                    <span>{employeeData.name}</span>
                </div>
                <div className='flex flex-row mr-4'>
                    <p className='font-medium '>Días tomados:&nbsp;&nbsp;</p>
                    <span className='text-rose-700'>{range[0].endDate ? pickedDays : 0}</span>
                </div>
                <div className='flex flex-row mr-4'>
                    <p className='font-medium '>Vacaciones restantes:&nbsp;&nbsp;</p>
                    <span className='text-rose-700'>{daysLeft.days_left}{type.field == 'Vacaciones' && range[0].endDate ? `-${pickedDays} = ${newDaysLeft}` : null}</span>
                </div>
            </div>

            <GenericModalTemplate open={openDatePicker} setOpen={setOpenDatePicker}>
                <div className='shadow-md'><DateeRangePicker ranges={range} setRanges={setRange} /></div>
            </GenericModalTemplate>

            <div className='flex flex-wrap flex-row w-full items-center mb-4 text-sm justify-between'>
                <div className='flex flex-col w-40 my-4 '>
                    <p className='font-medium mb-2'>Fecha de inicio:&nbsp;&nbsp;</p>
                    <div onClick={handleDatePicker} className='flex justify-left items-center pl-2 cursor-pointer outline-none h-8 w-5/6 rounded-md border-solid border border-gray-300 shadow-sm sm:text-sm'>
                        {formatedRange.start}
                    </div>
                </div>
                <div className='flex flex-col w-40 my-4'>
                    <p className='font-semibold mb-2'>Fecha de fin:&nbsp;&nbsp;</p>
                    <div onClick={handleDatePicker} className='flex justify-left items-center pl-2 cursor-pointer outline-none h-8 w-5/6 rounded-md border-solid border border-gray-300 shadow-sm sm:text-sm'>
                        {formatedRange.end}
                    </div>

                </div>
                <div className='flex flex-col w-56 my-4'>
                    <p className='font-semibold mb-2'>Motivo:&nbsp;&nbsp;</p>
                    <select
                        name="type"
                        id="type"
                        className="py-1 outline-none h-8 w-5/6 rounded-md border-solid border border-gray-300 shadow-sm sm:text-sm"
                        onChange={type.handleChange}
                    >
                        <option value="">Selccione</option>
                        <option value="Vacaciones">Vacaciones</option>
                        <option value="Salud">Salud</option>
                        <option value="Calamidad doméstica">Calamidad doméstica</option>
                        <option value="Falta injustificada">Falta injustificada</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <p className='font-semibold mb-2'>Descripción:&nbsp;&nbsp;</p>
                    <textarea
                        type="textarea"
                        id="description"
                        placeholder=""
                        min="0"
                        maxLength={145}
                        className="outline-none h-16 w-full rounded-md border-solid border border-gray-300 shadow-sm sm:text-sm"
                        onChange={reason.handleChange}
                    />
                    <WarningMessage open={warningMessage} setOpen={setWarningMessage}>
                        <p className="ml-2">Todos los campos deben ser completados</p>    
                    </WarningMessage>
                </div>
            </div>
        </ModalTemplate >
    )
}