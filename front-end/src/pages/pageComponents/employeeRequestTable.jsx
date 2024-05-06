
import {useState, useContext,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import SearchInput from '../../components/searchinput'
import {employeePaginationContext} from '../employeePage/employee'


export default function EmployeeRequestTable({ values, setValues, bgcolor, originalValues, numberOfElements, setOpen, sthElse, setId }) {

    const { tablePage, setTablePage } = useContext(employeePaginationContext);
    const [searchQuery, setSearchQuery] = useState('');
    const valuesArray = Object.keys(values[0])
    const [currentPageElements, setCurrentPageElements] = useState([])
    const location = useLocation();
    const page = location.pathname.split('/')[3]


    useEffect(() => {
        const filteredElements = values.filter((element) => element.Page === tablePage);
        setCurrentPageElements(filteredElements);
    }, [tablePage, values]);


    const handleClick = (ev) => {
        setOpen(true)
        setId(ev.currentTarget.id)
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

    const colorDictionary = {
        "Esperando": 'rgb(214 211 209)',
        "Denegado": 'rgb(251,213,213)',
        "Aprobado": 'rgb(188,240,218)'
      };

    return (

        <div className=''>
            <SearchInput onSearchChange={setSearchQuery} />
            <div >
                <div className='bg-blue-900 m-[31px] mt-[15px] min-h-[30px] rounded-lg border-gray-400 flex flex-row items-center justify-around text-gray-200 font-semibold border-blue-900 shadow-gray-800 shadow'>
                        {valuesArray.map((value, index) => (  
                            value != 'Page' ? <div key={index} className={`${value == 'ID°' ? 'w-[50px]': 'w-[170px]'}`}>{value}</div> : null
                        ))}
                </div>

                <div>
                    {currentPageElements.map((element) => (
                        <div onClick={handleClick} id={element.Id} key={element.Id} className='px-0 bg-white py-[15px] m-[31px] mt-[15px] rounded-lg border-gray-400 border-2 border-solid flex flex-row justify-around transition-transform hover:translate-x-[2px] hover:-translate-y-[2px] cursor-pointer shadow'>
                            {Object.entries(element).map(([key, value], index) => (
                                key == 'Page' || (
                                    colorDictionary[value] 
                                    ? 
                                    <div key={element.Id+index} className={`${key == 'ID°' ? 'w-[50px]': 'w-[170px]'}`}><div className='w-[80px] flex justify-center rounded-lg text-sm' style={{ backgroundColor: colorDictionary[value] || 'white' }}>{value}</div></div> 
                                    : 
                                    <div key={element.Id+index} className={`${key == 'ID°' ? 'w-[50px]': 'w-[170px]'}`}>{value}</div>)
                            ))}
                        </div>
                    ))}
                </div>

            </div>
            
        </div >
    )

}