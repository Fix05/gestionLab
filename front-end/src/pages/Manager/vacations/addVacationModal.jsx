import { useState, useEffect, useRef } from 'react'
import { format, isWeekend, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import useFetch from '../../../hooks/useFetch'
import useField from '../../../hooks/useField'
import ModalTemplate from '../pageComponents/modalTemplate'
import Modal from '../../../components/modal'
import DateeRangePicker from '../../../components/dateRangePicker'



export default function AddVacationModal({ open, setOpen, id, employeeData, setAnimation }) {

    const HEADER = "Registro de vacaciones o ausencias"
    const DAYS_LEFT_ENDPOINT = `http://127.0.0.1:8000/api/vacations/get-vacation-days-left/${id}`
    const ADD_VACATION_ENDPOINT = `http://127.0.0.1:8000/api/vacations/insert-new-absence/${id}`

    const [daysLeft, getDaysLeft] = useFetch(DAYS_LEFT_ENDPOINT, null, "GET")
    const [addingResult, addVacation] = useFetch(ADD_VACATION_ENDPOINT, {}, "POST", false)
    const [newDaysLeft, setNewDaysLeft] = useState()
    const [pickedDays, setPickedDays] = useState()
    const type = useField()
    const reason = useField()
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const datePickerRef = useRef(null);
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [range, setRange] = useState([{
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    }]);
    const [formatedRange, setFormatedRange] = useState({})

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


    const handleClick = () => {
        if (range[0].endDate && type.field && reason.field) {
            const dataToLoad = {
                startDate: range[0].startDate,
                endDate: range[0].endDate,
                description: reason.field,
                type: type.field,
                days: pickedDays,
            }

            addVacation(dataToLoad).then(()=>{
                getDaysLeft()
            })
        }

    }

    useEffect(() => {

        console.log(addingResult);

        if (Object.keys(addingResult).length > 0) {
            if (addingResult.message) {
                setAlertMessage(addingResult.message)
                console.log("Mensaje");
                setOpenAlert(true)
            } else {
                setAlertMessage("Vacaciones registrada")
                console.log("Vacaciones registrada");
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
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setOpenDatePicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {

        type.setField("")
        setPickedDays()
        resetFormatedRange()
        setRange([{
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }])
    }, [open])


    return (
        <ModalTemplate open={open} setOpen={setOpen} header={HEADER} employeeData={employeeData} handleClick={handleClick}>
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
            <div className={`top-0 w-full h-full absolute flex items-center justify-center bg-gray-500/75 ${openDatePicker ? '' : "hidden"}`}>
                <div ref={datePickerRef} className='shadow-md'><DateeRangePicker ranges={range} setRanges={setRange} /></div>
            </div>
            <div className='flex flex-wrap flex-row w-full items-center mb-4 text-sm justify-between'>
                <div className='flex flex-col w-40 my-4 '>
                    <p className='font-medium mb-2'>Fecha de inicio:&nbsp;&nbsp;</p>
                    <input
                        type="text"
                        id="start_date"
                        placeholder=""
                        min="0"
                        className="cursor-pointer outline-none h-8 w-5/6 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                        onClick={handleDatePicker}
                        autoComplete="off"
                        defaultValue={formatedRange.start}
                    />
                </div>
                <div className='flex flex-col w-40 my-4'>
                    <p className='font-semibold mb-2'>Fecha de fin:&nbsp;&nbsp;</p>
                    <input
                        type="text"
                        id="end_date"
                        placeholder=""
                        min="0"
                        className="cursor-pointer outline-none h-8 w-5/6 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                        onClick={handleDatePicker}
                        autoComplete="off"
                        defaultValue={formatedRange.end}
                    />
                </div>
                <div className='flex flex-col w-56 my-4'>
                    <p className='font-semibold mb-2'>Motivo:&nbsp;&nbsp;</p>
                    <select
                        name="type"
                        id="type"
                        className="py-1 outline-none h-8 w-5/6 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                        onChange={type.handleChange}
                    >
                        <option value="">Selccione</option>
                        <option value="Vacaciones">Vacaciones</option>
                        <option value="Salud">Salud</option>
                        <option value="Calamidad doméstica">Calamidad doméstica</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className='flex flex-col w-full my-4'>
                    <p className='font-semibold mb-2'>Descripción:&nbsp;&nbsp;</p>
                    <textarea
                        type="textarea"
                        id="description"
                        placeholder=""
                        min="0"
                        className="outline-none h-16 w-full rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                        onChange={reason.handleChange}
                    />
                </div>
            </div>
        </ModalTemplate >
    )
}