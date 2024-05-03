import { useState, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import useField from '../../../hooks/useField'
import AddingTable from '../../../components/addingTable'
import ModalTemplate from '../pageComponents/modalTemplate'
import { ExtraListMapping } from '../../../mapping/dataMapping'
import WarningMessage from '../../../components/warningMessage'

export default function AddExtraModal({ open, setOpen, id, employeeData }) {

    const EMPLOYES_URL = `http://127.0.0.1:8000/api/extras/get-employee-extras/${id}`
    const ADDING_URL = `http://127.0.0.1:8000/api/extras/add-extras/${id}`
    const DELETING_URL = `http://127.0.0.1:8000/api/extras/delete-extras/`
    const HEADER = "Registro de horas extras"
    const [result, getResult] = useFetch(EMPLOYES_URL, null, "GET")
    const [, addExtra] = useFetch(ADDING_URL, {}, "POST")
    const [, deleteExtra] = useFetch(DELETING_URL, null, "DELETE", false)
    const [changedList, setChangedList] = useState({})
    const [total, setTotal] = useState()
    const hours = useField()
    const amount = useField()
    const description = useField("")
    const [warningMessage, setWarningMessage] = useState(false)


    const handleAddClic = () => {
        if (hours.field && amount.field) {
            addExtra({ hours: hours.field, amount: amount.field, description: description.field }).then(() => {
                getResult()
            });
        } else {
            setWarningMessage(true)
        }
    }

    const handleClick = () => {
        setOpen(false)
    }

    const handleDelete = (id) => {
        deleteExtra(null, id).then(() => {
            getResult()
        })
    }

    useEffect(() => {

        if (result.length) {
            const newExtraList = result.map((element, index) => ({
                ...ExtraListMapping(element, index)
            }));
            setChangedList(newExtraList);

            const totals = newExtraList.reduce((prev, accum) => {
                return {
                    Monto: prev.Monto + accum.Monto,
                    Horas: prev.Horas + accum.Horas
                }
            })
            setTotal(totals)
        } else {
            setChangedList({})
        }
    }, [result]);

    useEffect(() => {
        hours.setField()
        amount.setField()
        description.setField()
        setWarningMessage(false)
    }, [open])


    return (

        <ModalTemplate open={open} setOpen={setOpen} header={HEADER} secondHeader={employeeData.date} employeeData={employeeData} handleClick={handleClick}>
            <div className='flex self-start mb-4 text-sm'>
                <div className='flex flex-row mr-4'>
                    <p className='font-medium '>Empleado:&nbsp;&nbsp;</p>
                    <span>{employeeData.name}</span>
                </div>
                <div className='flex flex-row'>
                    <p className='font-medium '>Salario:&nbsp;&nbsp;</p>
                    <span>${employeeData.salary}</span>
                </div>
            </div>
            <div className='flex flex-row w-full items-center mb-4 text-sm justify-between'>
                <p className='font-medium '>Ingrese Monto:&nbsp;&nbsp;</p>
                <input
                    type="number"
                    id="amount"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 pl-2 mr-2 w-1/3 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={amount.handleChange}
                />
                <p className='font-semibold '>Horas:&nbsp;&nbsp;</p>
                <input
                    type="number"
                    id="hours"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 w-1/4 pl-2 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={hours.handleChange}
                />
                <button onClick={() => { handleAddClic() }} className='flex ml-2 h-8 w-10 bg-gray-300 rounded items-center justify-center transition-colors duration-200 hover:bg-blue-200 hover:text-blue-900 transition-all hover:translate-x-[1px] hover:translate-y-[1px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-row w-full items-center  text-sm justify-between'>
                <p className='font-medium '>Descripción:&nbsp;&nbsp;</p>
                <input
                    type="text"
                    id="description"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 pl-2 ml-2 w-full rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={description.handleChange}
                />
                
            </div>
            <WarningMessage className={'mt-2'} open={warningMessage} setOpen={setWarningMessage}>
                    <p className="ml-2 text-xs">Todos los campos deben ser completados</p>    
            </WarningMessage>

            <div className='w-full mb-2'>
                {changedList && changedList.length > 0 && <AddingTable values={changedList} total={total} handleDelete={handleDelete} />}
            </div>
        </ModalTemplate >
    )
}