import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import AddAdvances from '../pages/Manager/advances/addAdvances'

const Asside = styled.aside`
background-color: rgb(55 65 81);
transition: padding 0.3s ease-in;

`

const Expansible = styled.li`
overflow: hidden;
${props => props.isselected ? (`max-height: ${props.isselected};`) : 'max-height: 36px;'}
transition: max-height 0.3s ease-in;

ul{
    opacity: 1;
}

`

const ExpansibleElements = styled.ul`
opacity: 0;
transition: opacity 0.4s ease-in;
`


export default function Aside() {

    const navigate = useNavigate()
    const location = useLocation();
    const page = location.pathname.split('/')[3]
    
    const [openElement, setOpenElement] = useState("")

    const handleExpansibleClick = (ev) => {
        ev.currentTarget.id != openElement ? setOpenElement(ev.currentTarget.id) : setOpenElement("")
    }

    return (
        <Asside id="logo-sidebar" className={`fixed bg-gray-700 shadow-2xl top-10 z-40 w-52 h-screen ${openElement ? "pt-6" : "pt-20"} transition-transform -translate-x-full bg-white  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className=" h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                <ul className="space-y-2 font-medium fixed ">
                    <li>
                        <a id="dashboard" href="#" className={`flex w-44 transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "dashboard" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "dashboard" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                            </svg>
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>

                    <li>
                        <Link to={"requests"} id="requests" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "requests" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "requests" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Solicitudes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"employees"} id="employees" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "employees" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "employees" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Empleados</span>
                        </Link>
                    </li>
                    <li>
                        <a id="hiring" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "hiring" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "hiring" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Contratación</span>
                        </a>
                    </li>
                    <li>
                        <a id="assistance" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "assistance" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "assistance" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Asistencia</span>
                        </a>
                    </li>
                    <li>
                        <a id="vacations" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "vacations" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "vacations" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Vacaciones</span>
                        </a>
                    </li>
                    <li>
                        <Link to={"payment"} id="payment" href="#" className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "payment" ? 'dark:bg-gray-700 text-gray-900 bg-gray-300' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "payment" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Pagos</span>
                        </Link>
                    </li>
                    <Expansible isselected={openElement === "advance" ? "120px" : "36px"}>
                        <a id="advance" onClick={handleExpansibleClick} className={`flex cursor-pointer transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "advance" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Adelantos</span>
                            <span className={`shrink-0 transition-transform ${openElement == "advance" ? "rotate-180" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </a>
                        <ExpansibleElements className="space-y-1 font-medium ml-8">
                            <li>
                                <Link to={"addAdvance"} id="addAdvance" href="#" className={`flex transition-colors duration-300 items-center text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 text-gray-900 bg-gray-300' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                                    <div className={`w-3 h-3 ${page == "addAdvance" ? "bg-gray-200" : "bg-gray-400"}  border-gray-500 rounded-full ml-2 mr-1 border-2 `}></div>Añadir
                                </Link>
                            </li>
                            <li>
                                <Link to={"recordAdvance"} id="recordAdvance" href="#" className={`flex transition-colors duration-300 items-center text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 text-gray-900 bg-gray-300' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                                    <div className={`w-3 h-3 ${page == "recordAdvance" ? "bg-gray-200" : "bg-gray-400"}  border-gray-500 rounded-full ml-2 mr-1 border-2 `}></div>Registro
                                </Link>
                            </li>
                        </ExpansibleElements>
                    </Expansible>

                    <Expansible isselected={openElement === "extra" ? "120px" : "36px"}>
                        <a id="extra" onClick={handleExpansibleClick} className={`flex cursor-pointer transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 ${page == "extra" ? 'text-gray-900 dark:text-white' : 'group-hover:text-gray-900 dark:group-hover:text-white'} `}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Horas extras</span>
                            <span className={`shrink-0 transition-transform ${openElement == "extra" ? "rotate-180" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </a>
                        <ExpansibleElements className="space-y-1 font-medium ml-8">
                            <li>
                                <Link to={"addExtra"} id="addExtra" href="#" className={`flex transition-colors duration-300 items-center text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 text-gray-900 bg-gray-300' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                                    <div className={`w-3 h-3 ${page == "addExtra" ? "bg-gray-200" : "bg-gray-400"}  border-gray-500 rounded-full ml-2 mr-1 border-2 `}></div> Añadir
                                </Link>
                            </li>
                            <li>
                                <Link to={"recordExtra"} id="recordExtra" href="#" className={`flex transition-colors duration-300 items-center text-gray-200 rounded-lg dark:text-white group ${page == "advance" ? 'dark:bg-gray-700 text-gray-900 bg-gray-300' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                                    <div className={`w-3 h-3 ${page == "recordExtra" ? "bg-gray-200" : "bg-gray-400"}  border-gray-500 rounded-full ml-2 mr-1 border-2 `}></div> Registro
                                </Link>
                            </li>
                        </ExpansibleElements>
                    </Expansible>
                    <li>
                        <Link to={"/"} id='exit' className={`flex transition-colors duration-300 items-center px-2 py-1.5 text-gray-200 rounded-lg dark:text-white group ${page == "exit" ? 'dark:bg-gray-700 bg-gray-300 text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700'} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap"></span>
                        </Link>
                    </li>
                </ul>
            </div>
        </Asside>
    )
}