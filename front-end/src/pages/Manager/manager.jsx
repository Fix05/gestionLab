import { AnimationProvider } from '../../contexts/doneAnimationContext'
import SlowlyShowing from '../../components/slowlyShowing'
import background from '../../assets/images/background.jpg'
import { useParams, Outlet } from "react-router-dom";
import Breadcrumb from '../../components/breadcumb'
import { createContext, useState } from 'react';
import Header from '../../components/header'
import useFetch from '../../hooks/useFetch'
import Aside from '../../components/aside';
import styled from 'styled-components'
import {useEffect} from 'react'


export const paginationContext = createContext()
export const pageContext = createContext()
export const breadcrumbContext = createContext()

const Container = styled.div`

/* background-image: url(${background});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed; */
min-height: 100vh;
`

const HEADER_BG = {
    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 0%, rgba(255,255,255,1) 100%)',
    borderBottom: '1px solid #dcdcdc',
    boxShadow: '-3px -13px 7px 11px rgba(0,0,0,0.29)'
}

const Div = styled.div`
margin-left: 208px;
`

export default function Manager() {

    const MESSAGE = "Manager"
    const { id } = useParams();
    const DATA_ENDPOINT = `http://18.119.103.188:8000/api/rh/get-info/${id}`
    const PHOTO_ENDPOINT = `http://18.119.103.188:8000/api/rh/download-photo/${id}`
    const [result] = useFetch(DATA_ENDPOINT, null, "GET")
    const [page, setPage] = useState("Manager")
    const [tablePage, setTablePage] = useState(1)
    const [breadcrumbNames, setBreadcrumbNames] = useState()


    useEffect(()=>{
        document.body.classList.add('manager-background');

        return () => {
            document.body.classList.remove('manager-background')
        }
    },[])

    return (
        <Container className=''>
            <paginationContext.Provider value={{ tablePage, setTablePage }}>
                <AnimationProvider>
                    <pageContext.Provider value={{ page, setPage }}>
                        <breadcrumbContext.Provider value={(breadcrumbNames, setBreadcrumbNames)}>
                            <SlowlyShowing time={500}>
                                <Header name={result.name} image={PHOTO_ENDPOINT} lastname={result.lastname} email={result.email} style={HEADER_BG} message={MESSAGE} />
                                <Aside />
                                <Div className='relative top-24 py-4 px-6'>

                                        <div className='flex justify-between h-10'>
                                            <Breadcrumb />
                                        </div>
                                        <Outlet />
                                    
                                </Div>
                            </SlowlyShowing>
                        </breadcrumbContext.Provider>
                    </pageContext.Provider>
                </AnimationProvider>
            </paginationContext.Provider>
        </Container>
    )
}

