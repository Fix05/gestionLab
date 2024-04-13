import { useEffect, useState, useContext } from 'react'
import useFetch from '../../../hooks/useFetch'
import Table from '../../../components/table'
import Pagination from '../../../components/pagination'
import { paginationContext } from '../manager'

export default function RecordExtra() {

    const ELEMENTS_PER_PAGE = 10
    const DEFAULT_DATE = { start_date: "2024-01" }
    const EXTRA_LIST_URL = "http://127.0.0.1:8000/api/extras/get-extrahours-record"
    const DATE_RANGE_URL = "http://127.0.0.1:8000/api/extras/extrahours-date-range"
    const [changedList, setChangedList] = useState([{}])
    const [originalValues, setOriginalValues] = useState([{}])
    const [dateRange] = useFetch(DATE_RANGE_URL, null, "GET")
    const [date, setDate] = useState({})
    const [listResult] = useFetch(EXTRA_LIST_URL, (date ? date : DEFAULT_DATE), "POST")
    const { tablePage, setTablePage } = useContext(paginationContext);
    const [message, setMessage] = useState('')

    useEffect(() => {
        setTablePage(1)
        if (listResult.length) {
            const newEmployeeList = listResult.map((element, index) => ({
                "N°": index + 1,
                Nombre: element.name + ' ' + element.lastname,
                Salario: element.base_salary,
                "Fecha": element.date,
                Estado: element.state,
                Monto: `${element.amount ? element.amount : "---"}`,
                Horas: element.hours,
                Id: element.id_extra,
                Page: Math.ceil((index + 1) / ELEMENTS_PER_PAGE)
            }));
            setChangedList(newEmployeeList);
            setOriginalValues(newEmployeeList)
        } else {
            setMessage(listResult.message)
        }
    }, [listResult]);


    useEffect(() => {
        if (dateRange.max) {
            setDate({
                start_date: Object.keys(dateRange).length ? dateRange.max.slice(0, 7) : ""
            })
        }
        setMessage(dateRange.message)
    }, [dateRange])

    const handleDateChange = (ev) => {
        const selectedDate = ev.target.value
        setDate({
            start_date: selectedDate
        })
    }

    return (

        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white">

            {message ? (
                < div className="bg-gray-300 px-4 py-3 text-white rounded">
                    <p className="text-center text-sm font-medium text-gray-800">
                        {message}
                    </p>
                </div>) : (
                <>
                    <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-teal-200"} numberOfElements={ELEMENTS_PER_PAGE} />
                    <div className="flex flex-row justify-between rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <div className='text-gray-700 text-sm'>
                            <label htmlFor="monthLimited">Escoja el mes: </label>
                            {console.log(dateRange.min)}
                            <input
                                className='w-5 cursor-pointer'
                                value={Object.keys(date).length ? date.start_date : ""}
                                type="month"
                                id="monthLimited"
                                name="monthLimited"
                                onChange={handleDateChange}
                                min={dateRange.min ? dateRange.min.slice(0, 7) : ""}
                                max={dateRange.max ? dateRange.max.slice(0, 7) : ""}
                            />
                        </div>
                        <Pagination totalPages={Math.ceil(changedList.length / 10)} />
                    </div>
                </>)
            }
        </div >

    )
}