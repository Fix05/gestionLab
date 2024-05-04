import { useState, useEffect, useContext } from "react";
import { paginationContext } from '../pages/Manager/manager'
import { employeePaginationContext } from '../pages/employeePage/employee'
import FieldsDictionary from '../dictionaries/paymentFieldsTranslates.json'

export default function useTransformData(list, dataMapping, elementsPerPage) {


    
    let contextToUse = useContext(paginationContext) || useContext(employeePaginationContext)
    

    const { setTablePage } = contextToUse;
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const [message, setMessage] = useState()

    useEffect(() => {
        
        
        setTablePage(1)
        if (list && list.length) {
            
            setMessage()
            const newEmployeeList = list.map((element, index) => ({
                ...dataMapping(element, index, FieldsDictionary),
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
        message,
        setMessage
    }

}

