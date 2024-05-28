import useFetch from '../../hooks/useFetch'
import Table from '../../components/table'
import { useParams } from 'react-router-dom'
import { useEffect, useState, createContext, useContext } from 'react';
import Pagination from '../../components/pagination'
import SlowlyShowing from '../../components/slowlyShowing'

import { paginationContext } from './manager'

export default function Manager() {

    const { id } = useParams()

    const REQUESTS_LIST_URL = `http://127.0.0.1:8000/api/employee/get-assigned-requests/${id}`
    const [listResult] = useFetch(REQUESTS_LIST_URL, null, "GET")
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const { tablePage, setTablePage } = useContext(paginationContext);
    const ELEMENTS_PER_PAGE = 10

    useEffect(() => {
        setTablePage(1)
        if (listResult.length) {
            const newRequestsList = listResult.map((element, index) => ({
                "N°": index + 1,
                Nombre: element.name + ' ' + element.lastname,
                Tipo: element.type,
                "Razón": element.reason,
                Fecha: element.date,
                Estado: element.state,
                Id: element.id,
                Page: Math.ceil((index + 1) / ELEMENTS_PER_PAGE)
            }));
            setChangedList(newRequestsList);
            setOriginalValues(newRequestsList)
        }
    }, [listResult]);

    return (
        <SlowlyShowing time={100}>
            <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white">
                <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={'bg-cyan-200'} numberOfElements={ELEMENTS_PER_PAGE} showId={true}/>
                <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                    <Pagination totalPages={Math.ceil(changedList.length / 10)} />
                </div>
            </div>
        </SlowlyShowing>
    )
}