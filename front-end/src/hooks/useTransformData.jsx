import { useState, useEffect, useContext } from "react";
import { paginationContext } from '../pages/Manager/manager'

export default function useTransformData(list, dataMapping, elementsPerPage) {

    const { setTablePage } = useContext(paginationContext);
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const [message, setMessage] = useState('')

    useEffect(() => {
        setTablePage(1)
        console.log(list);
        if (list && list.length) {
            const newEmployeeList = list.map((element, index) => ({
                "N°": index + 1,
                ...dataMapping(element, index),
                Page: Math.ceil((index + 1) / elementsPerPage)
            }));
            setChangedList(newEmployeeList);
            setOriginalValues(newEmployeeList)
        } else {
            setMessage(list.message)
        }
    }, [list]);


    return {
        changedList,
        setChangedList,
        originalValues,
        setOriginalValues,
        message
    }

}
