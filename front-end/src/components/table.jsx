import { paginationContext } from '../pages/Manager/manager'
import { useContext, useEffect, useState } from 'react'
import SearchInput from '../components/searchinput'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { AddIcon, DetailsIcon, InfoIcon } from '../components/tableIcons'
import payment_states from '../dictionaries/paymentState.json'




const ICONS = {
    "addAdvance": <AddIcon />,
    "addExtra": <AddIcon />,
    "requests": <DetailsIcon />,
    "payment": <DetailsIcon />,
    "employees": <DetailsIcon />,
    "recordExtra": <InfoIcon />,
    "recordAdvance": <InfoIcon />,
    "addVacations": <AddIcon />,
    "recordVacations": <InfoIcon />
}

const Container = styled.div`
`

export default function Table({className, values, setValues, bgcolor, originalValues, numberOfElements, setOpen, sthElse, setId, showId=false }) {

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


    const getCellValues = (key, value) => {
        const OPTIONS = ['Sueldo', 'Monto', 'Salario']
        if (OPTIONS.includes(key) && value !== '---') {
            return `$${value}`;
        }
        return value;
    }


    const getCellProperties = (key, value) => {
        let classNames
        if ((key === 'Id' && showId == false) || key === 'Page') {
            return { ignore: true }
        }
        const isNumberColumn = key === 'N°';
        classNames = `whitespace-nowrap px-4 py-2 ${isNumberColumn ? 'font-medium text-gray-900' : 'text-gray-700'}`;
        const cellValue = getCellValues(key, value)
        return { cellValue, classNames }
    }

    return (

        <div className={`relative ${className}`}>
            <SearchInput onSearchChange={setSearchQuery} />
            <Container className="relative flex overflow-x-hidden rounded-t-lg items-end flex-col">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className={`ltr:text-left rtl:text-right ${bgcolor} border-b-2 border-gray-400`}>
                        <tr>
                            {valuesArray.map((value) => (
                               (value != "Id" || showId==true) && <th key={value} className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">{value != "Page" && value}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentPageElements.map((element) => (
                            
                            <tr id={element.Id} key={element.Id}>
                                {Object.entries(element).map(([key, value], index) => {
                                    const { ignore, cellValue, classNames } = getCellProperties(key, value)
                                    if (ignore) return null;
                                    return (
                                        <td key={index} className={classNames}>
                                        {key == 'Estado' ? (
                                            <div className={`text-xs text-center flex justify-center rounded w-16`} style={{backgroundColor: payment_states[value] || 'white'}}>
                                                {cellValue}
                                            </div>
                                        ) : (
                                            cellValue
                                        )}
                                    </td>
                                )})}
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    
                                    {(sthElse && element["Fecha mínima"] == undefined) || (sthElse && element.Estado != 'Pagado') ? (
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