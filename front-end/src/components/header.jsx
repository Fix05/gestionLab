import styled from 'styled-components'
import { useState } from 'react'
import logo from '../assets/images/logoBlanco_beta-removebg-preview.png'
import defaultUser from '../assets/images/defaultUser.png'
import {useAuth} from '../contexts/authenticationContext'


const Extensible = styled.div`
overflow: hidden;
transition: max-height 0.3s ease-in;
${props => props.isselected ? (`max-height: 120px`) : 'max-height: 0px'}

`

const Container = styled.header`
position: fixed;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.41);
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.41);
    -moz-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.41);

background: rgb(255,255,255);
background: linear-gradient(173deg, rgba(255,255,255,1) 0%, rgba(214,214,214,1) 53%, rgba(185,185,185,1) 100%); 
z-index: 20;
min-height: 10px;
`

const HEADER_BG = {
    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 0%, rgba(255,255,255,1) 100%)',
    borderBottom: '1px solid #dcdcdc',
    boxShadow: '-3px -13px 7px 11px rgba(0,0,0,0.29)'
}

const Button = styled.button`
border-radius: 200px 80px 80px 200px;
-webkit-border-radius: 200px 80px 80px 200px;
-moz-border-radius: 200px 80px 80px 200px;
`

const Logo = styled.div`
position: absolute;
left: 30px;
`

const H1 = styled.h1`
font-family: 'Noto Serif Display', serif;
font-size: 1.60rem;
`


export default function Header({ name, lastname, email, style, message, image }) {

    const [isOpen, setIsOpen] = useState(false);
    const {logout} = useAuth()

    const showMenu = () => {
        setIsOpen(!isOpen);
    }


    return (
        <Container className="w-full shadow-2xl" style={style}>
            <div className="flex flex-row-reverse justify-between items-center mx-auto w-full px-4 py-4  shadow-md sm:px-6 lg:px-8">
                <div className="flex items-center sm:justify-between sm:gap-4">
                    <Logo className="relative lelft-0 hidden sm:block">
                        <img className='w-40' src={logo} alt="" />
                    </Logo>
                    <div className="flex flex-1 items-center gap-8 sm:justify-end">
                        <Button type="button" onClick={showMenu} className="bg-gray-500 group flex shrink-0 items-center p-1 pr-1.5 transition-all">
                            <span className="sr-only">Menu</span>
                            <img
                                alt="Man"
                                src={image}
                                className="h-10 w-10 rounded-full object-cover"
                                onError={(ev) => { ev.target.src = defaultUser }}
                            />
                            <p className="ms-2 hidden text-left text-xs sm:block">
                                <strong className="block font-medium text-white">{name} {lastname}</strong>

                                <span className="text-gray-100"> {email} </span>
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>

                        <Extensible isselected={isOpen} className={`z-50 bg-gray-500 absolute right-8 top-16 mt-2 w-48 rounded-md shadow-md  focus:outline-none `}>
                            <div className=" align-right ">
                                <a href="/" onClick={()=>{logout()}} className="flex text-gray-100 justify-between px-4 py-2 text-sm transition-all hover:bg-gray-600">Cerrar sesión
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                </a>
                            </div>
                        </Extensible>
                    </div>
                </div>

                <div className="absolute left-48 ">
                    <H1 className="text-2xl text-gray-900 sm:text-3xl">{message}</H1>
                    <p className="mt-1.5 text-sm text-gray-500">

                    </p>
                </div>
            </div>
        </Container>
    )
}