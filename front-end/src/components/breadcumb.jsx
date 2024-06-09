import { Link, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch'
import { useEffect, useState, useContext } from 'react';
import translates from '../dictionaries/breadcrumbTranslates.json'
import {breadcrumbContext} from '../pages/Manager/manager'

export default function Breadcurmb() {

    const [id, setId] = useState()
    const [result] = useFetch(
        `http://18.119.103.188:8000/api/rh/get-info/${id}`,
        null,
        "GET"
    )
    const {breadcrumbNames, setBreadcrumbNames} = useContext(breadcrumbContext)
    const [breadcumbElements, setBreadcumbElements] = useState([])
    const location = useLocation();
    const paths = location.pathname.split('/').filter(pathSegment => pathSegment)
    const firstNumber = paths.findIndex(element => !isNaN(element))
    firstNumber != -1 ? paths.splice(firstNumber, 1) : null
    
    useEffect(() => {
        const newArray = paths.map(element => {
            if (!isNaN(element) && !paths.includes("requests") && !paths.includes("payment")) {
                setId(element)
                return result.name ? `${result.name} ${result.lastname}` : "";        
            } 
            return element
        });
        setBreadcumbElements(newArray)
        return () => setId("")

    }, [result, location]);


    return (
        <nav className="mw-48 flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {breadcumbElements.map((path, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index == 0 ?
                            (<a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                {path}
                            </a>
                            ) : (
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroklinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <Link to={path in translates ? path : null} href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{path in translates ? translates[path] : path}</Link>
                                </div>
                            )
                        }
                    </li>
                ))}
            </ol>
        </nav>

    )
}