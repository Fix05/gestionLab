import SlowlyShowing from '../../components/slowlyShowing'
import LoadingModal from '../../components/loadingModal'
import { useEffect, useState, useContext } from 'react';
import Pagination from '../../components/pagination'
import { paginationContext } from './manager'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Table from '../../components/table'


export default function Manager() {

    const { id } = useParams()

    const REQUESTS_LIST_URL = `http://127.0.0.1:8000/api/employee/get-assigned-requests/${id}`
    const [listResult, , , loading] = useFetch(REQUESTS_LIST_URL, null, "GET", true, null, true)
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
        <>
            <LoadingModal loading={loading} text={''} />
            <div className={`mt-6 rounded-lg border-2 border-gray-400 bg-white transition-opacity duration-300 ${loading ? 'opacity-0': 'opacity-100'}`}>
                <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={'bg-cyan-200'} numberOfElements={ELEMENTS_PER_PAGE} showId={true}/>
                <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                    <Pagination totalPages={Math.ceil(changedList.length / 10)} />
                </div>
            </div>
        </>
    )
}