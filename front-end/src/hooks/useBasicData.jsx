import {useEffect, useState} from 'react'
import Months from '../dictionaries/months.json'

export default function useBasicData(originalValues) {

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()+1
    const currentYear = currentDate.getFullYear()


    const [id, setId] = useState()
    const [modalData, setModalData] = useState({})

    useEffect(() => {
        if (originalValues.length > 1) {
            const selectedEmployee = originalValues.find((element) => element.Id == id)
            const { Nombre, Sueldo } = selectedEmployee
            console.log(selectedEmployee);
            setModalData({ name: Nombre, salary: Sueldo, date: ` de ${Months[currentMonth]} de ${currentYear}` })
        }
    }, [id])

    return{
        id,
        setId,
        modalData
    }

}