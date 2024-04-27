import GenericModalTemplate from '../../../components/genericModalTemplate'
import useFetch from '../../../hooks/useFetch'
import { useState, useEffect } from 'react'


const infoRecordDictionary = {

    name: "Nombre",
    salary: "Salario",
    date: "Fecha",
    state: "Estado",
    amount: "Monto",
    hours: "Horas",
    description: "Descripción",
    typeAbsence: "Tipo de ausencia",
    startDate: "Inicio de ausencia",
    endDate: "Fin de ausencia"

}


export default function RecordDetailedInfo({ open, setOpen, endpoint, values }) {

    const [result] = useFetch(endpoint, null, "GET")
    const [newValues, setNewValues] = useState()
    const HandleClick = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (result && Object.keys(result).length) {
            
            setNewValues({ ...values, ...result })
        }
    }, [result])

    return (
        <GenericModalTemplate open={open} setOpen={setOpen} handleClick={HandleClick}>
            <div className="flow-root px-8 w-[600px]">
                <dl className="flex flex-wrap mt-9 divide-y divide-gray-100 text-sm">
                    {newValues && Object.entries(newValues).map((element, index) => {
                        const [key, value] = element
                        const translatedKey = infoRecordDictionary[key]
                        if (value) {
                            return (
                                <div key={index} className="w-[16rem] min-w-[10rem] grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 px-5">
                                    <dt className="font-medium text-gray-900">{translatedKey || key}:</dt>
                                    <dd className="pl-5 text-gray-700 sm:col-span-2 ">{translatedKey == 'Monto' || translatedKey == 'Salario' ? "$" + value : value}</dd>
                                </div>)
                        }
                    })}
                </dl>    
            </div>
        </GenericModalTemplate>
    )
}