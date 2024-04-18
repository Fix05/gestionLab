


export default function PaymentInfoTable({ values }) {

    console.log(values);
    const keysArray = Object.keys(values[0])
    let cont = 0

    return (

        <div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">N°</th>
                        {keysArray.map((value) => (
                            <th key={value} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {values.map((element, index) => {
                        cont++
                        return (
                            <tr id={element.Id} key={element.Id}>
                                <td key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900>">{cont}</td>
                                {Object.entries(element).map(([key, value], index) => (
                                    <td key={index} className={`whitespace-nowrap px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{key.includes('Monto') ? `$${value}` : value}</td>
                                ))}
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
        </div>

    )
}