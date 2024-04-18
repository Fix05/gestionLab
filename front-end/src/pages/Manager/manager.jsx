import Header from '../../components/header'
import styled from 'styled-components'
import { useParams, Outlet } from "react-router-dom";
import useFetch from '../../hooks/useFetch'
import { createContext, useEffect, useState } from 'react';
import Aside from '../../components/aside';
import Breadcrumb from '../../components/breadcumb'
import image from '../../assets/images/mcloving.jpeg'
import background from '../../assets/images/3415222.jpg'
import PrettyView from '../../components/prettyview'


export const paginationContext = createContext()
export const pageContext = createContext()
export const breadcrumbContext = createContext()

const Container = styled.div`

background-image: url(${background});
background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
min-height: 720px;
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
    const DATA_URL = `http://127.0.0.1:8000/api/rh/get-info/${id}`
    const [result] = useFetch(DATA_URL, null, "GET", id)
    const [page, setPage] = useState("Manager")
    const [tablePage, setTablePage] = useState(1)
    const [breadcrumbNames, setBreadcrumbNames] = useState()

    return (
        <Container className='bg-rose-50'>
            <paginationContext.Provider value={{ tablePage, setTablePage }}>
                <pageContext.Provider value={{ page, setPage }}>
                    <breadcrumbContext.Provider value={(breadcrumbNames, setBreadcrumbNames)}>
                    <Header name={result.name} image={image} lastname={result.lastname} email={result.email} style={HEADER_BG} message={MESSAGE} />
                    <Aside />
                    <Div className='relative top-24 py-4 px-6'>
                        <div className='flex justify-between h-10'>
                            <Breadcrumb />
                        </div>
                        <Outlet /> 
                    </Div>
                    </breadcrumbContext.Provider>
                </pageContext.Provider>
            </paginationContext.Provider>
        </Container>
    )
}

