import { paginationContext } from '../pages/Manager/manager'
import { useContext, useEffect, useState } from 'react'
import SearchInput from '../components/searchinput'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { AddIcon, DetailsIcon, InfoIcon } from '../components/tableIcons'


const PAYMENT_STATES = {
    "Por pagar": "bg-sky-200",
    "Pagado": "bg-green-200",
    "Atrasado": "bg-red-200",
    "Cobrado": "bg-green-200",
    "Por cobrar": "bg-violet-200"
}

const ICONS = {
    "addAdvance": <AddIcon />,
    "addExtra": <AddIcon />,
    "requests": <DetailsIcon />,
    "payment": <DetailsIcon />,
    "employees": <DetailsIcon />,
    "recordExtra": <InfoIcon />,
    "recordAdvance": <InfoIcon />


}

const Container = styled.div`
`

export default function Table({ values, setValues, bgcolor, originalValues, numberOfElements, setOpen, sthElse, setId }) {

    const { tablePage, setTablePage } = useContext(paginationContext);
    const [searchQuery, setSearchQuery] = useState('');
    const valuesArray = Object.keys(values[0])
    const [currentPageElements, setCurrentPageElements] = useState([])
    const location = useLocation();
    const page = location.pathname.split('/')[3]
    useEffect(() => {
        const filteredElements = values.filter((element) => element.Page === tablePage);
        setCurrentPageElements(filteredElements);
    }, [tablePage, values]);


    const handleClick = (id) => { 
        setOpen(true) 
        console.log("ID:", id);
        setId(id)

     }

    useEffect(() => {
        if (searchQuery != "") {
            const searchedValues = originalValues.filter(value => {
                return Object.values(value).some(element => {
                    return String(element).toLowerCase().includes(searchQuery.toLowerCase())
                })
            })
            if (searchedValues.length) {
                const newValues = searchedValues.map((element, index) => {
                    return { ...element, Page: Math.ceil((index + 1) / numberOfElements) }
                })
                setValues(newValues)
                setTablePage(1)
            } else {
                let emptyObj = {}
                for (const key in originalValues[0]) {
                    emptyObj[key] = ""
                }
                setValues([emptyObj])
            }
        } else {
            setValues(originalValues)
        }
    }, [searchQuery])

    return (

        <div className='relative'>
            <SearchInput onSearchChange={setSearchQuery} />
            <Container className="relative flex overflow-x-hidden rounded-t-lg items-end flex-col">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className={`ltr:text-left rtl:text-right ${bgcolor} border-b-2 border-gray-400`}>
                        <tr>
                            {valuesArray.map((value) => (
                                value != "Id" && <th key={value} className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value != "Page" && value}</th>
                            ))}
                            <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentPageElements.map((element) => (
                            <tr id={element.Id} key={element.Id}>
                                {Object.entries(element).map(([key, value], index) => (
                                    PAYMENT_STATES[value] ?
                                        key != "Id" && <td key={index} className={`text-center whitespace-nowrap px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                            <div className={`${PAYMENT_STATES[value]} text-xs text-center rounded w-16`}>{key != "Page" && value}</div></td>
                                        :
                                        key != "Id" && <td key={index} className={`whitespace-nowrap px-4 py-2 ${key == 'N°' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{key != "Page" && value}</td>
                                ))}
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {sthElse ? (
                                        <button onClick={() => handleClick(element.Id)}>
                                            {ICONS[page]}
                                        </button>
                                    ) : (
                                        <Link to={`${element.Id}`}>
                                            {ICONS[page]}
                                        </Link>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </div >
    )
}