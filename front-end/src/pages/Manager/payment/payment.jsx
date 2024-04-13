import { useEffect, useState, useContext } from 'react'
import useFetch from '../../../hooks/useFetch'
import useTransformData from '../../../hooks/useTransformData'
import useBasicData from '../../../hooks/useBasicData'
import Table from '../../../components/table'
import Pagination from '../../../components/pagination'
import { paginationContext } from '../manager'
import AddPaymentModal from './addPaymentModal'
import {PaymentMapping} from '../../../mapping/dataMapping'

export default function Payment() {

    const ELEMENTS_PER_PAGE = 10
    const CURRENT_DATE = new Date();
    const YEAR_MONTH = CURRENT_DATE.toISOString().split('T')[0].slice(0, 7)
    const PAYMENT_LIST_URL = "http://127.0.0.1:8000/api/payment/get-payment-overall"
    const [date, setDate] = useState({
        start_date: YEAR_MONTH
    })
    const [dateRange] = useFetch("http://127.0.0.1:8000/api/payment/payment-date-range", null, "GET")
    const [listResult] = useFetch(PAYMENT_LIST_URL, date, "POST")
    const {changedList, setChangedList, originalValues, setOriginalValues} = useTransformData(listResult, PaymentMapping, ELEMENTS_PER_PAGE)
    const {id, setId, modalData} = useBasicData(originalValues)
    const [open, setOpen] = useState(false)
    const handleDateChange = (ev) => {
        const selectedDate = ev.target.value
        setDate({
            start_date: selectedDate
        })
    }

    return (

        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-white">
            <AddPaymentModal open={open} setOpen={setOpen} id={id} employeeData={modalData}/>
            <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-orange-200"} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId}/>
            <div className="flex flex-row justify-between rounded-b-lg border-t border-gray-200 px-4 py-2">
                <div className='text-gray-700 text-sm'>
                    <label htmlFor="monthLimited">Escoja el mes: </label>
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
        </div>
    )
}