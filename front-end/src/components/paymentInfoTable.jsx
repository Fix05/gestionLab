import payment_states from '../dictionaries/paymentState.json'
import styled from 'styled-components'


const Td = styled.td`
text-align: center;
`

export default function PaymentInfoTable({ values, paidInfo }) {

    console.log(values);
    const keysArray = Object.keys(values[0])
    let cont = 0

/*     const payment_states = {
        "Por pagar": "bg-blue-200",
        "Pagado": "bg-green-200",
        "Atrasado": "bg-red-200",
        "Cobrado": "bg-green-200",
        "Por cobrar": "bg-violet-200"
    } */

    return (

        <div className='w-full'>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">N°</th>
                        {paidInfo && Object.keys(paidInfo).length > 0 && <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Pago</th>}
                        {keysArray.map((value, index) => (
                            <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {values.map((element, index) => {
                        cont++
                        return (

                            <tr id={element.Id} key={element.Id}>
                                <Td key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900>">{cont}</Td>
                                {Object.entries(element).map(([key, value], index) => {

                                    return (
                                        payment_states[value] ? (
                                            <Td key={index} className={`flex justify-center whitespace-nowrap px-4 py-2 text-gray-700`}>
                                                <div className={`${payment_states[value]} flex justify-center items-center text-xs rounded w-16 h-5`}>
                                                    {value}
                                                    {console.log(payment_states[value])}
                                                </div>
                                            </Td>
                                        ) : (
                                            <Td key={index} className={`whitespace-nowrap px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{key.includes('Monto') ? `$${value}` : value}</Td>
                                        ))
                                }
                                )}
                            </tr>)
                    })}

                    {/* <tr className="bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">${total.Monto}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{total.Horas}</td>
                        {total.Horas && <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>} 
                    </tr> */}
                </tbody>
            </table>
        </div >

    )
}