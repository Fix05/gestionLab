import { checkExpireToken } from '../components/repetitiveFunctions/authToken.js'
import { Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authenticationContext';
import Loading from '../assets/gif/loading.gif'
import useFetch from '../hooks/useFetch.jsx'
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';


function ProtectedRoute({ role, children }) {

    const REFRESH_TOKEN_ENDPOINT = 'http://18.119.103.188:8000/api/user/refresh'
    const { user, loading } = useAuth();
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const [, getNewToken, error, refreshLoading] = useFetch(REFRESH_TOKEN_ENDPOINT, null, "POST", false, refreshToken)
    const tokenIsValid = checkExpireToken();
    useEffect(() => {
        if (token && !tokenIsValid) {
            getNewToken().then((response) => {
                if (response && response.access_token) {
                    localStorage.setItem('token', response.access_token);
                }
                navigate("/")
            })
        }
    }, [getNewToken, refreshToken])


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("Abierto");
        document.body.innerHTML = 'Este sitio solo es accesible desde una PC.';
    }else{
        console.log("Abierto desde PC");
    }
    

    const checkId = () => {
        if (token) {
            const decoded = jwtDecode(token);
            const isCorrectId = (id == decoded.id)
            return isCorrectId
        }
    }

    if (loading) {
        return (
            <div className='flex flex-col content-center justify-center items-center w-full h-[500px]'>
                <img className='w-12' src={Loading} alt="" />
            </div>
        )
    }


    if(token){
        if (!refreshLoading) {
            if (!user || user.role != role || !tokenIsValid) {
                return <Navigate to="/" state={{ from: location }} replace />;
            }
        } else {
            return (
                <div>Loading...</div>
            )
        }

        if (!checkId()) {
            return <Navigate to="/Error" state={{ from: location }} replace />;
        }
    }else{
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    

    return children;
}

export default ProtectedRoute;
