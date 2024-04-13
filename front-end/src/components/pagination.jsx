import { useContext } from 'react'
import { paginationContext } from '../pages/Manager/manager'

export default function Pagination({totalPages }) {

    const { tablePage, setTablePage } = useContext(paginationContext);

    const handleClick = (ev) => {
        console.log(tablePage);
        ev.preventDefault()
        setTablePage(parseInt(ev.target.id))
    }

    const nextPage = (ev) => { 
        ev.preventDefault()
        tablePage+1 <= totalPages ? setTablePage(tablePage+1): null
     }

    const prevPage = (ev) => { 
        ev.preventDefault()
        tablePage-1 >= 1 ? setTablePage(tablePage-1): null  
     }

    return (

        <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
                <a
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    onClick={prevPage}
                >
                    <span className="sr-only">Prev Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </li>


            {Array.from({ length: totalPages }, (_, index) =>( 
                <li key={index+1}>
                    <a
                        href="#"
                        className={`block h-8 w-8 rounded text-center leading-8 ${index+1 == tablePage ? 'border-blue-600 bg-lime-900 text-white': 'border border-gray-100 bg-white text-gray-900'}`}
                        onClick={handleClick} id={index+1}
                    >
                        {index+1}
                    </a>
                </li>

            ))}
            <li>
                <a
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    onClick={nextPage}
                >
                    <span className="sr-only">Next Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </li>
        </ol>

    )
}