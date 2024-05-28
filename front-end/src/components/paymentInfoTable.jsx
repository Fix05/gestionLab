import payment_states from '../dictionaries/paymentState.json'



export default function PaymentInfoTable({ values, totalPaid }) {

    const keysArray = Object.keys(values[0])
    let cont = 0

    return (

        <div className='w-full'>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">N°</th>
                        
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
                                <td key={index} className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900>">{cont}</td>
                                {Object.entries(element).map(([key, value], index) => {
                                    return (
                                        payment_states[value] ? (
                                            <td key={index} className={`flex justify-center whitespace-nowrap text-center px-4 py-2 text-gray-700`}>
                                                <div className={`flex justify-center items-center text-xs rounded w-16 h-5`} style={{backgroundColor: payment_states[value] }}>
                                                    {value}
                                                </div>
                                            </td>
                                        ) : (
                                            <td key={index} className={`whitespace-nowrap text-center px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{key.includes('Monto') ? `$${value}` : value}</td>
                                        ))
                                })}
                            </tr>
                        )
                    })}

                    <tr className="bg-gray-100">
                        <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900">Total pagado</td>
                        {keysArray.map((totalCell, index) => (
                            <td key={index} className="whitespace-nowrap text-center px-4 py-2 text-gray-700">{totalCell.includes("Monto")? "$"+(totalPaid || 0) : null}</td>
                        ))}
                    </tr>

                </tbody>
            </table>
        </div >

    )
}