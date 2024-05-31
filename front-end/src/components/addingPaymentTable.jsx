import { Container } from '../styledComponents/detailsBox'
import MonthTranslates from '../dictionaries/monthTranslates.json'
import { useState, useEffect } from 'react';

export default function AddingPaymentTable({ values, setValues, total, setTotal, monthOfPayment }) {

    const currentDate = new Date()
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var formatedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    useEffect(() => {
        const checkedValues = values.filter((element) => element.checked == true)
        const totalAmount = checkedValues.reduce((accumulador, current) => {

            if(current.name == 'advances'){
                return { amount: accumulador.amount - current.amount }
            }
            return { amount: accumulador.amount + current.amount }
        })
        setTotal(totalAmount.amount)
    }, [values])


    const handleChecking = (ev) => {
        const newValues = [...values]
        newValues[ev.target.id] = { ...newValues[ev.target.id], checked: ev.target.checked }
        setValues(newValues)

    }

    return (
        <Container className="max-h-[170px]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Pago</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fecha actual</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mes del pago</th>
                        <th className="flex justify-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">Monto</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">

                    <tr className='bg-gray-50'>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Salario
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {formatedDate}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {monthOfPayment}
                        </td>
                        <td className="flex justify-center whitespace-nowrap px-4 py-2 text-gray-700">
                            ${values[0].amount}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="flex items-center me-4">
                                <input disabled checked id="teal-checkbox" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded " />
                            </div>
                        </td>
                    </tr>
                    <tr className={values[1].checked ? 'bg-gray-50': ''}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            Total horas extras
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        </td>
                        <td className="flex justify-center whitespace-nowrap px-4 py-2 text-gray-700">
                            +${values[1].amount ? values[1].amount : 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="flex items-center me-4">
                                <input disabled={values[1].amount ? false : true} onClick={handleChecking} id="1" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded " />
                            </div>
                        </td>
                    </tr>
                    <tr className={values[2].checked ? 'bg-gray-50': ''}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            Total adelantos
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        </td>
                        <td className="flex justify-center whitespace-nowrap px-4 py-2 text-gray-700">
                            -${values[2].amount ? values[2].amount : 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <div className="flex items-center me-4">
                                <input disabled={values[2].amount ? false : true} onClick={handleChecking} id="2" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded " />
                            </div>
                        </td>
                    </tr>


                    <tr className="bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        <td className="flex justify-center whitespace-nowrap px-4 py-2 text-gray-700">${total}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}