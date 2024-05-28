import { useEffect } from 'react';
import { Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authenticationContext';
import useFetch from '../hooks/useFetch.jsx'
import { jwtDecode } from 'jwt-decode';
import { checkExpireToken } from '../components/repetitiveFunctions/authToken.js'
import Loading from '../assets/gif/loading.gif'

/* import Loading from '../styledComponents/loading.jsx' */
/* import Loading from '../components/loadingModal.jsx' */



/* const LoadinScreen = () => { 

    return(
        <div className='flex flex-row justify-center items-center w-full h-full'>
            <Loading loading={deletingLoading} text={"Eliminando"} />
        </div>
    )
} */

function ProtectedRoute({ role, children }) {

    const REFRESH_TOKEN_ENDPOINT = 'http://127.0.0.1:8000/api/user/refresh'
    const { user, loading } = useAuth();
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const [, getNewToken, error, refreshLoading] = useFetch(REFRESH_TOKEN_ENDPOINT, null, "POST", false, refreshToken)
    const tokenIsValid = checkExpireToken();
    useEffect(() => {
        console.log("Efecto del protectRoute");
        if (token && !tokenIsValid) {
            console.log("Token caducó");
            getNewToken().then((response) => {
                console.log("REspuesta del refresh", response);
                if (response && response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    console.log("Nuevo token seteado");
                    console.log("Se va a navegar al login");
                }
                navigate("/")
            })

        }
    }, [getNewToken, refreshToken])

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
                console.log("user", user);
                console.log(user.role, "==", role);
                console.log(tokenIsValid);
                console.log("Usuario rol o tiempo de validez no valido, se redirigirá al login");
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
