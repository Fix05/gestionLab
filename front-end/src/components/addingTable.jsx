import {Container} from '../styledComponents/detailsBox'
import { useState, useEffect } from 'react'




export default function AddingTable({ values, total, handleDelete }) {

    const keysArray = Object.keys(values[0])

    return (
        <Container className="max-h-[147px]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        {keysArray.map((value) => (
                            value != "Id" && <th key={value} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value}</th>
                        ))}
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {values.map((element) => (
                        <tr id={element.Id} key={element.Id}>
                            {Object.entries(element).map(([key, value], index) => (
                                key != "Id" && <td key={index} className={`whitespace-nowrap px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{key == "Monto" ? `$${value}` : value}</td>
                            ))}
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <button onClick={() => handleDelete(element.Id)}>quitar</button>
                                
                            </td>
                        </tr>
                    ))}

                    <tr className="bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">${total.Monto}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{total.Horas}</td>
                        {total.Horas && <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>} 
                    </tr>
                </tbody>
            </table>
        </Container>
    )

}