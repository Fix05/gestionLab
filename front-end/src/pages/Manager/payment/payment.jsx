import DoneAnimation from '../../../components/doneAnimationWindow'
import useTransformData from '../../../hooks/useTransformData'
import { PaymentMapping } from '../../../mapping/dataMapping'
import PaymentDoneGif from '../../../assets/gif/payment.gif'
import LoadingModal from '../../../components/loadingModal'
import Pagination from '../../../components/pagination'
import useBasicData from '../../../hooks/useBasicData'
import AddPaymentModal from './addPaymentModal'
import useFetch from '../../../hooks/useFetch'
import Table from '../../../components/table'
import { useEffect, useState } from 'react'

export default function Payment() {

    const ELEMENTS_PER_PAGE = 10
    const SUCCESSFULLY_ADDING_MESSAGE = "Pago registrado con éxito"
    const CURRENT_DATE = new Date();
    const YEAR_MONTH = CURRENT_DATE.toISOString().split('T')[0].slice(0, 7)
    const PAYMENT_LIST_ENDPOINT = "http://18.119.103.188:8000/api/payment/get-payment-overall"
    const [date, setDate] = useState({ start_date: YEAR_MONTH })
    const [dateRange] = useFetch("http://18.119.103.188:8000/api/payment/payment-date-range", null, "GET")
    const [listResult, getListResult, , loading] = useFetch(PAYMENT_LIST_ENDPOINT, date, "POST", true, null, true)
    const { changedList, setChangedList, originalValues, setOriginalValues } = useTransformData(listResult, PaymentMapping, ELEMENTS_PER_PAGE)
    const { id, setId, modalData } = useBasicData(originalValues)
    const [open, setOpen] = useState(false)
    const [sthElse, setSthElse] = useState(false)
    const [openAnimation, setOpenAnimation] = useState(false)
    const handleDateChange = (ev) => {
        const selectedDate = ev.target.value
        setDate({
            start_date: selectedDate
        })
    }

    useEffect(() => {
        setSthElse(modalData.state != 'Pagado')

    }, [modalData])

    return (
        <>
            <LoadingModal loading={loading} text={''} />
            <div className={`mt-6 rounded-lg border-2 border-gray-400 bg-white transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <DoneAnimation open={openAnimation} setOpen={setOpenAnimation} message={SUCCESSFULLY_ADDING_MESSAGE} gif={PaymentDoneGif} />
                <AddPaymentModal open={open} setOpen={setOpen} id={id} employeeData={modalData} paymentData={changedList} reloadResults={getListResult} setAnimation={setOpenAnimation} />
                <Table values={changedList} setValues={setChangedList} originalValues={originalValues} bgcolor={"bg-orange-200"} numberOfElements={ELEMENTS_PER_PAGE} setOpen={setOpen} sthElse={true} setId={setId} />
                <div className="flex flex-row justify-between rounded-b-lg border-t border-gray-200 px-4 py-2">
                    <div className='text-gray-700 text-sm'>
                        <label htmlFor="monthLimited">Escoja el mes: </label>
                        <input
                            className='w-[180px] cursor-pointer'
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
        </>
    )
}