import useFetch from '../../hooks/useFetch'
import Table from '../../components/table'
import { useEffect, useState, createContext, useContext } from 'react';
import Pagination from '../../components/pagination'
import { paginationContext } from './manager'
import {useAnimation} from '../../contexts/doneAnimationContext'
import DoneAnimation from '../../components/doneAnimationWindow'
import AddedEmployee from '../../assets/gif/addedEmployee.gif'


export default function Manager() {

    const ELEMENTS_PER_PAGE = 10
    const EMPLOYEE_LIST_URL = `http://127.0.0.1:8000/api/rh/get-employees-overall`
    const [listResult] = useFetch(EMPLOYEE_LIST_URL, null, "GET")
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const { tablePage, setTablePage } = useContext(paginationContext);
    const { showAnimation, setShowAnimation, renderComponent, message } = useAnimation();


    const HandleChange = (ev) => {
        console.log(ev.target.value);
    }

    useEffect(() => {
        setTablePage(1)
        if (listResult.length) {
            const newEmployeeList = listResult.map((element, index) => ({
                "N°": index + 1,
                Nombre: element.name + ' ' + element.lastname,
                Cedula: element.dni,
                Departamento: element.department,
                Estado: element.state,
                Id: element.id,
                Page: Math.ceil((index + 1) / ELEMENTS_PER_PAGE)
            }));
            setChangedList(newEmployeeList);
            setOriginalValues(newEmployeeList)
        } else {

        }
    }, [listResult]);

    return (
        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white ">
            <DoneAnimation open={showAnimation} setOpen={setShowAnimation} message={message} gif={renderComponent}/>
            <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-lime-200"} numberOfElements={ELEMENTS_PER_PAGE} />
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <Pagination totalPages={Math.ceil(changedList.length / 10)} />
            </div>
        </div>
    )
}

