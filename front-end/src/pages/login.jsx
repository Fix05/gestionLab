import { useNavigate } from 'react-router-dom'
import background from '../assets/images/login_background2.jpg'
import logo from '../assets/images/logoBlanco_beta.png'
import styled from 'styled-components'
import { useState, useEffect, createContext } from 'react'
import useFetch from '../hooks/useFetch'
import useField from '../hooks/useField'
import Modal from '../components/modal'

export const modalContext = createContext()

const Body = styled.div`
background-image: url(${background});
background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 700px;
width: 100%;
height: 100%;
min-width: 300px;
position: fixed;
top: 0;
left: 0;
`


export default function Login() {

  const email = useField("email");
  const pass = useField("password");

  const data = { "email": email.field, "password": pass.field }
  const url = "http://127.0.0.1:8000/api/user/"
  const navigate = useNavigate()
  const { result, getResult } = useFetch(data, "POST", url)
  const [open, setOpen] = useState(false)
  const [modalText, setModalText] = useState('')



  useEffect(() => {
    if (Object.keys(result).length) {
      if (result.status_code) {
        setModalText(result.message)
        setOpen(true)
      } else {
        navigate(`/manager/${result.id_employee}`)
      }
    }
  }, [result])

  return (
    <Body>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-12 h-8 mr-2" src={logo} alt="logo" />
          GestionLab
        </a>
        <div className="bg-opacity-80 backdrop-blur-lg p-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión con tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={email.handleChange} />
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={pass.handleChange} />
              </div>
              <modalContext.Provider value={{ open, setOpen }}>
                <Modal text={modalText} />
              </modalContext.Provider>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="text-gray-500 dark:text-gray-300">Guardar cuenta</label>
                  </div> */}
                </div>
             {/*    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Olvidaste tu contraseña?</a> */}
              </div>
              <button onClick={getResult} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </Body>
  )
}
