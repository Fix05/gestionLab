import { useNavigate } from 'react-router-dom'
import background from '../assets/images/login_background3.jpg'
import logo from '../assets/images/logoBlanco_beta.png'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/authenticationContext'
import useFetch from '../hooks/useFetch'
import useField from '../hooks/useField'
import Modal from '../components/modal'
import SlowlyShowing from '../components/slowlyShowing'
import { jwtDecode } from 'jwt-decode';
import { checkExpireToken } from '../components/repetitiveFunctions/authToken'


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

const routes = {
  "User": "User/mainPage",
  "Manager": "Manager/dashboard"
}

export default function Login() {

  const email = useField("email");
  const pass = useField("password");
  const { login } = useAuth()
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const [data, setData] = useState({})
  const URL = "http://127.0.0.1:8000/api/user/token"
  const [result] = useFetch(URL, data, "POST")
  const [open, setOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [showLogin, setShowLogin] = useState(false)


  const handleSubmit = (ev) => {
    ev.preventDefault()
    setData({ "email": email.field, "password": pass.field })
  }

  useEffect(() => {

    if (token && checkExpireToken()) {
      const decoded = jwtDecode(token);
      navigate(`/${decoded.role}/${decoded.id}/${decoded.role === 'User' ? '' : 'dashboard'}`);
    } else {
      setShowLogin(true)
    }

    if (Object.keys(result).length) {
      if (result.status_code) {
        setModalText(result.message)
        setOpen(true)
      } else {
        const decoded = jwtDecode(result.access_token);
        login({
          id: decoded.id,
          mail: decoded.sub,
          role: decoded.role
        }, result.access_token, result.refresh_token)

        if (decoded.role == "User") {
          navigate(`/User/${decoded.id}`)
        } else {
          navigate(`/Manager/${decoded.id}/dashboard`)
        }

      }
    }
  }, [result, token])


  return showLogin && (
    
      <Body>
        <SlowlyShowing>
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
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={email.handleChange} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={pass.handleChange} />
                </div>

                <Modal open={open} setOpen={setOpen} text={modalText} />

                <div className="flex items-center justify-between">
                  <div className="flex items-start">

                  </div>

                </div>
                <button onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all hover:translate-x-[1px] hover:translate-y-[1px]">Sign in</button>
              </form>
            </div>
          </div>
        </div>
        </SlowlyShowing>
      </Body>
  )
}
