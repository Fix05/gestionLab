import { useState, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import useField from '../../../hooks/useField'
import ModalTemplate from '../pageComponents/modalTemplate'
import AddingPaymentTable from '../../../components/addingPaymentTable'
import WarningMessage from '../../../components/warningMessage'


export default function AddPaymentModal({ open, setOpen, id, employeeData, paymentData, reloadResults, setAnimation }) {

    const HEADER = "Registro de pago"
    const BUTON_TEXT = "Registrar pago"
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
    const [warningMessage, setWarningMessage] = useState(false)



    const handleAddClick = () => {
        if (inputAmount.field) {
            const newAmount = [...amount]
            newAmount[0] = { ...amount[0], amount: +inputAmount.field }
            setAmount(newAmount)
        } else {
            setWarningMessage(true)
        }
    }

    const handleSubmit = () => {
        addPayment(dataToAdd).then(() => {
            reloadResults()
        })
        setOpen(false)
        setAnimation(true)
    }


    useEffect(() => {
        setAmount([
            { name: "salary", amount: employeePayment.Sueldo, checked: true },
            { name: "extras", amount: result.extras, checked: false },
            { name: "advances", amount: result.advances, checked: false }
        ])
        setWarningMessage(false)
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
    }, [amount, total, description.field])

    return (

        <ModalTemplate open={open} setOpen={setOpen} header={HEADER} secondHeader={employeeData.date} handleClick={handleSubmit} buttonText={BUTON_TEXT}>
            <div className='flex self-start mb-4 text-sm'>
                <div className='flex flex-row mr-4'>
                    <p className='font-medium '>Empleado:&nbsp;&nbsp;</p>
                    <span>{employeeData.name}</span>
                </div>
                <div className='flex flex-row'>
                    <p className='font-medium '>Salario:&nbsp;&nbsp;</p>
                    <span>${employeeData.salary}</span>
                </div>
            </div>

            <div className='flex relative flex-row w-full items-center mb-2 text-sm justify-left'>
                <p className='font-medium no-wrap'>Ingrese Monto:&nbsp;&nbsp;</p>
                <input
                    type="number"
                    id="amount"
                    placeholder=""
                    min="0"
                    className="outline-none h-8 pl-2 mr-2 w-[72%] rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={inputAmount.handleChange}
                />
                <WarningMessage open={warningMessage} className={'absolute top-2'} setOpen={setWarningMessage}>
                    <p className="ml-2 text-xs">Ingrese el monto que desea establecer</p>
                </WarningMessage>

                <button onClick={() => { handleAddClick() }} className='flex ml-2 h-8 w-10 bg-gray-300 rounded items-center justify-center transition-colors duration-200 hover:bg-blue-200 hover:text-blue-900 transition-all hover:translate-x-[1px] hover:translate-y-[1px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-row w-full items-center text-sm justify-between'>
                <p className='font-medium '>Descripción:&nbsp;&nbsp;</p>
                <input
                    type="text"
                    id="description"
                    placeholder=""
                    min="0"
                    maxLength={54}
                    className="outline-none h-8 pl-2 ml-2 w-full rounded-md border-solid border border-gray-200 shadow-sm sm:text-sm"
                    onChange={description.handleChange}
                />
            </div>

            <div className='w-full mb-2'>
                <AddingPaymentTable values={amount} setValues={setAmount} total={total} setTotal={setTotal} monthOfPayment={employeeData.date}/>
            </div>
        </ModalTemplate >
    )
}