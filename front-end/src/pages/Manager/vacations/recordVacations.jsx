import { useEffect, useState, useContext } from 'react'
import useFetch from '../../../hooks/useFetch'
import useTransformData from '../../../hooks/useTransformData'
import useBasicData from '../../../hooks/useBasicData'
import Table from '../../../components/table'
import RecordDetailedInfo from '../pageComponents/recordDetailedInfo'
import { VacationsMapping } from '../../../mapping/dataMapping'
import Pagination from '../../../components/pagination'

export default function RecordVacations() {
    const ELEMENTS_PER_PAGE = 10
    const VACATIONS_LIST_ENDPOINT = "http://127.0.0.1:8000/api/vacations/get-vacations-record"
    const DATE_RANGE_URL = "http://127.0.0.1:8000/api/vacations/vacations-date-range"
    const [dateRange] = useFetch(DATE_RANGE_URL, null, "GET")
    const [listResult] = useFetch(VACATIONS_LIST_ENDPOINT, date, "POST")
    const [date, setDate] = useState({ month: "2024-01" })
    const {
        changedList,
        setChangedList,
        originalValues,
        setOriginalValues,
        message,
        setMessage } = useTransformData(listResult, VacationsMapping, ELEMENTS_PER_PAGE)
    const [open, setOpen] = useState(false)
    const { id, setId, modalData } = useBasicData(originalValues)
    const DESCRIPTION_ENDPOINT = `http://127.0.0.1:8000/api/vacations/get-vacation-description/${id}`

    const handleDateChange = (ev) => {
        const selectedDate = ev.target.value
        setDate({ month: selectedDate })
    }

    useEffect(() => {
        if (dateRange.max) {
            setDate({month: Object.keys(dateRange).length ? dateRange.max.slice(0, 7) : ""})
        }
        setMessage(dateRange.message)
    }, [dateRange])


    return (
        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white">
            <RecordDetailedInfo open={open} setOpen={setOpen} endpoint={DESCRIPTION_ENDPOINT} values={modalData} />
            <RecordDetailedInfo open={open} setOpen={setOpen} endpoint={DESCRIPTION_ENDPOINT} values={modalData} />
            {message ? (
                <div className="bg-gray-300 px-4 py-3 text-white rounded">
                    <p className="text-center text-sm font-medium text-gray-800">
                        {message}
                    </p>
                </div>
            ) : (
                <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-teal-200"} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId} />
            )}
            <div className="flex flex-row justify-between rounded-b-lg border-t border-gray-200 px-4 py-2">
                <div className='text-gray-700 text-sm'>
                    <label htmlFor="monthLimited">Escoja el mes: </label>
                    <input
                        className='w-[150px] cursor-pointer'
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
        </div >
    )
}