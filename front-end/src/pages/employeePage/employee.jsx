import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import DoneAnimation from '../../components/doneAnimationWindow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, createContext } from 'react'
import SlowlyShowing from '../../components/slowlyShowing'
import Sended from '../../assets/gif/sendedRequest.gif'
import Header from '../../components/header';
import useFetch from '../../hooks/useFetch'
import styled from 'styled-components'


const Container = styled.div`
position: relative;
top: 0px;
min-height: 100vh;
`

export const employeePaginationContext = createContext()

export default function Employee() {

    const MESSAGE = "Empleados"
    const DONE_MESSAGE = "Solicitud enviada correctamente"
    const { id } = useParams();
    const DATA_URL = `http://18.119.103.188:8000/api/rh/get-info/${id}`
    const PHOTO_ENDPOINT = `http://18.119.103.188:8000/api/rh/download-photo/${id}`
    const [result] = useFetch(DATA_URL, null, 'GET')
    const location = useLocation();
    const { pathname } = location;
    const isDetailPage = pathname.includes("recordRequest") || pathname.includes("addRequest");
    const [adjustGridAreas, setAdjustGridAreas] = useState(isDetailPage);
    const [tablePage, setTablePage] = useState(1)

    const [showAnimationWindow, setShowAnimationWindow] = useState(false)

    useEffect(() => {
        setAdjustGridAreas(isDetailPage);
    }, [isDetailPage]);

    useEffect(() => {
        document.body.classList.add('manager-background')

        return () => {
            document.body.classList.remove('manager-background')
        }
    }, [])


    const [show, setShow] = useState(false);

    const handleSwap = () => {
        setShow(!show);
    };

    return (

        <SlowlyShowing time={500}>
            <employeePaginationContext.Provider value={{ tablePage, setTablePage }}>
                <Header name={result.name} lastname={result.lastname} email={result.email} message={MESSAGE} image={PHOTO_ENDPOINT} />
                <Container className='p-10 flex column justify-center pt-40 relative '>
                    <DoneAnimation open={showAnimationWindow} setOpen={setShowAnimationWindow} message={DONE_MESSAGE} gif={Sended} />
                    <div className="absolute w-[90%] top-[138px]">
                        <Outlet context={[showAnimationWindow, setShowAnimationWindow]} />
                    </div>

                    <div className={`absolute flex ${adjustGridAreas ? '' : 'justify-center'} row w-full my-8`}>
                        <article className={`bg-opacity-95 transition-all duration-1000 ${adjustGridAreas ? 'w-[150px] -translate-y-[95px] translate-x-[58px] h-12 mx-1' : 'max-h-56 w-[500px] mx-6'} bg-gray-100  rounded-lg border border-gray-100  shadow-sm ease-in-out hover:shadow-2xl hover:bg-opacity-100 sm:p-6`}

                        >
                            <span className={`inline-block rounded bg-blue-600 p-2 flex justify-center items-center w-10 h-10 text-white transition-transform duration-500 ${adjustGridAreas && '-translate-y-[20px] -translate-x-[20px]'}`}>
                                <FontAwesomeIcon icon={faFolderOpen} className="w-5 h-5" />
                            </span>
                            <div className={`transition-opacity duration-500 ${adjustGridAreas ? "opacity-0 pointer-events-none hidden" : "opacity-100"} `}>
                                <div href="#">
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        Puedes ver tus solicitudes en esta sección.
                                    </h3>
                                </div>
                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                    En esta pagina podrás ver todas tus solicitudes con la información pertinente de cada una de ellas,
                                    así como los estados y las respuestas de los respectivos responables de su revisión.
                                </p>
                            </div>

                            <Link onClick={() => setAdjustGridAreas(true)} to={'recordRequest'} href="#" className={`group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-transform duration-1000 ${adjustGridAreas && '-translate-y-[75px] translate-x-[25px] inline-block w-[32px]'}`}>
                                Ver solicitudes
                            </Link>
                        </article>
                        <article className={`relative bg-opacity-95 transition-all duration-1000 ${adjustGridAreas ? 'w-[150px] -translate-y-[95px] translate-x-[58px] h-12 mx-1' : 'max-h-56 w-1/2 mx-6'} bg-gray-100 w-1/2  rounded-lg border border-gray-100 p-4 shadow-sm ease-in-out hover:shadow-2xl hover:bg-opacity-100 sm:p-6`}

                        >
                            <span className={`inline-block rounded bg-blue-600 p-2 flex justify-center items-center w-10 h-10 text-white transition-transform duration-500 ${adjustGridAreas && '-translate-y-[20px] -translate-x-[20px]'}`}>
                                <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                            </span>
                            <div className={`transition-opacity duration-500 ${adjustGridAreas ? "opacity-0 pointer-events-none hidden" : "opacity-100"}`}>
                                <div href="#">
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        Presenta tus solicitudes a tus superiores en esta sección.
                                    </h3>
                                </div>
                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                    Si necesitas presentar una solicitud a recursos humanos, pidendo permisos por situaciones
                                    personales, o médicas, solicitar un adeleanto, usar tus días de vacaciones u otro tipo de
                                    peticiones, da click en el siguiente enlace para crear una solicitud.
                                </p>
                            </div>
                            <Link onClick={() => setAdjustGridAreas(true)} to={'addRequest'} href="#" className={` mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-transform duration-1000 ${adjustGridAreas && '-translate-y-[75px] translate-x-[25px] inline-block w-[90px]'}`}>
                                Crear nueva solicitud
                            </Link>
                        </article>

                    </div>
                </Container>
            </employeePaginationContext.Provider>

        </SlowlyShowing>
    )
}