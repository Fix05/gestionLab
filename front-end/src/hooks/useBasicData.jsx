import { useEffect, useState } from 'react'
import MonthTranslates from '../dictionaries/monthTranslates.json'

export default function useBasicData(originalValues) {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()


    const [id, setId] = useState()
    const [modalData, setModalData] = useState({})

    const getDate = (dateString) => {

        if (dateString) {
            const date = new Date(dateString + 'T00:00:00')
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            return (
                `${MonthTranslates[month]} de ${year}`
            )
        }
        return `${MonthTranslates[currentMonth]} de ${currentYear}`
    }


    useEffect(() => {
        if (originalValues.length >= 1) {

            const selectedEmployee = originalValues.find((element) => element.Id == id)
            const { Nombre, Sueldo, Estado, Fecha, Monto, Horas, Salario, Id, "Fecha de fin": endDate, "Fecha de inicio": startDate, Tipo, "Fecha mínima": minDate, "Fecha máxima": maxDate } = selectedEmployee
            setModalData({
                Id: Id,
                name: Nombre,
                salary: Sueldo || Salario,
                date: !startDate ? Fecha || getDate(minDate) : null,
                state: Estado,
                hours: Horas,
                amount: Monto,
                startDate: startDate,
                endDate: endDate,
                typeAbsence: Tipo
            })
        }
    }, [id])

    return {
        id,
        setId,
        modalData
    }

}