import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import styled from 'styled-components'
import background from '../../assets/images/3415222.jpg'
import Header from '../../components/header';
import image from '../../assets/images/goku.jpg'
import { MagicMotion } from "react-magic-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'


const Container = styled.div`
position: relative;
top: 0px;
background-image: url(${background});
background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
min-height: 560px;
`

export default function Employee() {

    const MESSAGE = "Solicitudes de empleados"
    const { id } = useParams();
    const DATA_URL = `http://127.0.0.1:8000/api/rh/get-info/${id}`
    const [result] = useFetch(DATA_URL, null, 'GET')
    const location = useLocation();
    const { pathname } = location;
    const isDetailPage = pathname.includes("recordRequest") || pathname.includes("addRequest");
    const [adjustGridAreas, setAdjustGridAreas] = useState(isDetailPage);

    const gridTemplateAreasString = adjustGridAreas
        ? `"h s b2 b2 b2" "b b b b b" `
        : `"b b b b b" "h h b2 s s" `;


    useEffect(() => {
        setAdjustGridAreas(isDetailPage);
    }, [isDetailPage]);

    return (
        <>
            <Header name={result.name} lastname={result.lastname} email={result.email} message={MESSAGE} image={image} />
            <Container className='p-10 flex pt-24 '>
                <MagicMotion>
                    <div className="w-full">
                        <div style={{ display: "grid", gridTemplateColumns: "20fr 20fr 10fr 20fr 20fr", gridTemplateRows: "11fr 25fr", gridTemplateAreas: gridTemplateAreasString, color: "black", fontWeight: "bold", fontSize: "1.2em" }} >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "0.5rem", gridArea: "b" }}>
                                <Outlet />
                            </div>
                            <div className="flex items-center justify-center w-full"
                                style={{
                                    gridArea: "b2",
                                }}>

                            </div>
                            <article className={`bg-opacity-95 ${adjustGridAreas ? "max-h-12 w-[230px] mr-2" : "max-h-72"} bg-gray-100 w-full relative rounded-lg border border-gray-100 p-4 shadow-sm ease-in-out hover:shadow-2xl hover:bg-opacity-100 sm:p-6`}
                                style={{
                                    gridArea: "h",
                                }}
                            >
                                <span className={`inline-block rounded bg-blue-600 p-2 flex justify-center items-center w-10 h-10 text-white ${adjustGridAreas && 'absolute top-1'}`}>
                                    <FontAwesomeIcon icon={faFolderOpen} className="w-5 h-5" />
                                </span>
                                <div className={`${adjustGridAreas ? "opacity-0" : "opacity-100"}`}>
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
                                <Link onClick={() => setAdjustGridAreas(true)} to={'recordRequest'} href="#" className={`group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 ${adjustGridAreas && '-translate-y-[187px] translate-x-[3rem]'}`}>
                                    Ver solicitudes
                                </Link>
                            </article>
                            <article className={`bg-opacity-95 ${adjustGridAreas ? "max-h-12 w-[230px] " : "max-h-72"} bg-gray-100 relative w-full rounded-lg border border-gray-100 p-4 shadow-sm  ease-in-out hover:shadow-2xl hover:bg-opacity-100 sm:p-6`}
                                style={{
                                    gridArea: "s",
                                }}
                            >
                                <span className={`inline-block rounded bg-blue-600 p-2 flex justify-center items-center w-10 h-10 text-white ${adjustGridAreas && 'absolute top-1'}`}>
                                    <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                                </span>
                                <div className={`${adjustGridAreas ? "opacity-0" : "opacity-100"}`}>
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
                                <Link onClick={() => setAdjustGridAreas(true)} to={'addRequest'} href="#" className={`mt-4 inline-flex items-center text-sm font-medium text-blue-600 ${adjustGridAreas && 'transform -translate-y-[215px] translate-x-[3rem]'}`}>
                                    Crear nueva solicitud
                                </Link>
                            </article>
                        </div>
                    </div>
                </MagicMotion>
                {/* <MagicMotion>
                    <div>
                        <div className="grid"
                            style={{
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "8fr 8fr",
                                gridTemplateAreas: gridTemplateAreasString,
                            }}
                        >
                            <article style={{ gridArea: "r" }} className="bg-opacity-95 max-h-72 bg-gray-100 mx-5 mt-16 w-full rounded-lg border border-gray-100 p-4 shadow-sm transition hover:shadow-2xl hover:bg-opacity-100 sm:p-6">
                                <span className="inline-block rounded bg-blue-600 p-2 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                        <path strokeWidth="2" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>
                                </span>
                                <a href="#">
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        Puedes ver tus solicitudes en esta sección.
                                    </h3>
                                </a>
                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                    En esta pagina podrás ver todas tus solicitudes con la información pertinente de cada una de ellas,
                                    así como los estados y las respuestas de los respectivos responables de su revisión.
                                </p>
                                <Link to={'recordRequest'} href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                                    Ver solicitudes
                                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                        &rarr;
                                    </span>
                                </Link>
                            </article>
                            <article style={{ gridArea: "a" }} className="bg-opacity-95 max-h-72 bg-gray-100 mx-5 w-full mt-16 rounded-lg border border-gray-100 p-4 shadow-sm transition hover:shadow-2xl hover:bg-opacity-100 sm:p-6">
                                <span className="inline-block rounded bg-blue-600 p-2 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeWidth="2" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                </span>
                                <a href="#">
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        Presenta tus solicitudes a tus superiores en esta sección.
                                    </h3>
                                </a>
                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                    Si necesitas presentar una solicitud a recursos humanos, pidendo permisos por situaciones
                                    personales, o médicas, solicitar un adeleanto, usar tus días de vacaciones u otro tipo de
                                    peticiones, da click en el siguiente enlace para crear una solicitud.
                                </p>
                                <Link to={'addRequest'} href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                                    Crear nueva solicitud
                                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                        &rarr;
                                    </span>
                                </Link>
                            </article>
                        </div>
                    </div>
                </MagicMotion> */}
            </Container>
        </>
    )
}