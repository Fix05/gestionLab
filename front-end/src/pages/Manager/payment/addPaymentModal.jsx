import { Fragment, useState, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import useField from '../../../hooks/useField'
import ModalTemplate from '../pageComponents/modalTemplate'
import AddingPaymentTable from '../../../components/addingPaymentTable'


export default function AddPaymentModal({ open, setOpen, id, employeeData, paymentData, reloadResults }) {

    const HEADER = "Registro de pago"
    const PAYMENT_ENDPOINT = `http://127.0.0.1:8000/api/payment/payment-extras-and-advances/${id}`
    const ADD_PAYMENT_ENDPOINT = `http://127.0.0.1:8000/api/payment/add-new-payment/${id}`
    const [result] = useFetch(PAYMENT_ENDPOINT, null, "GET")
    const [dataToAdd, setDataToAdd] = useState()
    const [, addPayment] = useFetch(ADD_PAYMENT_ENDPOINT, null, "POST", false)
    const [total, setTotal] = useState()
    const employeePayment = paymentData.find((element) => element.Id == id)
    const [amount, setAmount] = useState([])
    const inputAmount = useField("")
    const description = useField("")



    const handleAddClick = () => {
        if (inputAmount.field) {
            const newAmount = [...amount]
            newAmount[0] = { ...amount[0], amount: +inputAmount.field }
            setAmount(newAmount)
        }
    }

    const handleClick = () => {
        console.log(dataToAdd);
        addPayment(dataToAdd).then(() => {
            reloadResults()
        })
        setOpen(false)
    }


    useEffect(() => {
        setAmount([
            { name: "salary", amount: employeePayment.Sueldo, checked: true },
            { name: "extras", amount: result.extras, checked: false },
            { name: "advances", amount: result.advances, checked: false }
        ])
    }, [result, open]);


    useEffect(() => {
        if (amount.length) {
            setDataToAdd({
                amount: total,
                extras: amount[1].checked,
                advances: amount[2].checked,
                description: description.field
            })
        }
    }, [amount, total, description])

    return (

        <ModalTemplate open={open} setOpen={setOpen} header={HEADER} employeeData={employeeData} handleClick={handleClick}>
            <div className='flex flex-row w-full items-center mb-2 text-sm justify-left'>
                <p className='font-medium '>Ingrese Monto:&nbsp;&nbsp;</p>
                <input
                    type="number"
                    id="amount"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 pl-2 mr-2 w-1/3 rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={inputAmount.handleChange}
                />

                <button onClick={() => { handleAddClick() }} className='flex ml-2 h-8 w-10 bg-gray-300 rounded items-center justify-center transition-colors duration-200 hover:bg-blue-200 hover:text-blue-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-row w-full items-center mb-4 text-sm justify-between'>
                <p className='font-medium '>Descripción:&nbsp;&nbsp;</p>
                <input
                    type="text"
                    id="description"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 pl-2 ml-2 w-full rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={description.handleChange}
                />
            </div>
            <div className='w-full mb-2'>
                <AddingPaymentTable values={amount} setValues={setAmount} total={total} setTotal={setTotal} />
            </div>
        </ModalTemplate >
    )
}