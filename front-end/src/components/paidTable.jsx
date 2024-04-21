export default function PaidTable({ values, paidInfo }) {
    
    const paymentObject = values[0]
    const keysArray = Object.keys(paymentObject)

    const salaryWasModify = (payment_amount) => {
        const expectedPayment = paidInfo.extra + paidInfo.base_salary - paidInfo.advance
        return (expectedPayment != payment_amount)
    }

    const salaryMessage = (payment_amount) => {

        const modifiedAmount = payment_amount - (paidInfo.extra + paidInfo.base_salary - paidInfo.advance)
        const expectedPaymentValue = paidInfo.base_salary + modifiedAmount
        const message = `El el valor del sueldo se modificó en (${modifiedAmount > 0 ? "+" + modifiedAmount : modifiedAmount}) al 
                        hacer el pago.`

        return message
    }


    return (
        <div className="w-full">
            <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">N°</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Pago</th>
                        {keysArray.map((value, index) => (
                            <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900>">1</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Horas extras</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">{paymentObject["Fecha de Pago"]}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">+${paidInfo.extra || 0}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700"></td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900>">2</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Adelantos</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">{paymentObject["Fecha de Pago"]}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">-${paidInfo.advance || 0}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700"></td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700"></td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900>">3</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Sueldo</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">{paymentObject["Fecha de Pago"]}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700">+${paidInfo.base_salary || 0}</td>
                            <td className="whitespace-nowrap text-center max-w-72 px-4 py-2 text-gray-700 text-wrap">{salaryWasModify(paymentObject["Monto pagado"]) ? salaryMessage(paymentObject["Monto pagado"]) : null}</td>
                            <td className="whitespace-nowrap text-center px-4 py-2 text-gray-700"></td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900>">4</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Total</td>
                            {Object.entries(values[0]).map(([key, value], index) => (
                                <td key={index} className={`whitespace-nowrap text-center px-4 py-2 text-gray-700`}>{key.includes('Monto') ? `$${value}` : value}</td>
                            ))}
                        </tr>
                </tbody>
            </table>
        </div>
    )

}

