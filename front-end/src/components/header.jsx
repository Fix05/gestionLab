import styled from 'styled-components'
import logo from '../assets/images/logoBlanco_beta-removebg-preview.png'


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


export default function Header({name, lastname, email, style, message, image}) {

    return (
        <Container className="w-full shadow-2xl" style={style}>
            <div className="flex flex-row-reverse justify-between items-center mx-auto w-full px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center sm:justify-between sm:gap-4">
                    <Logo className="relative lelft-0 hidden sm:block">
                        <img className='w-40' src={logo} alt="" />
                    </Logo>

                    <div className="flex flex-1 items-center gap-8 sm:justify-end">


                        <Button type="button" className="bg-opacity-20 bg-white group flex shrink-0 items-center p-1 pr-1.5 transition-all hover:translate-x-[1px] hover:translate-y-[1px]">
                            <span className="sr-only">Menu</span>
                            <img
                                alt="Man"
                                src={image}
                                className="h-10 w-10 rounded-full object-cover"
                            />

                            <p className="ms-2 hidden text-left text-xs sm:block">
                                <strong className="block font-medium">{name} {lastname}</strong>

                                <span className="text-gray-500"> {email} </span>
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