import { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authenticationContext';
import useFetch  from '../hooks/useFetch.jsx'
import { jwtDecode } from 'jwt-decode';
import { checkExpireToken } from '../components/repetitiveFunctions/authToken.js'


function ProtectedRoute({ role, children }) {

    const REFRESH_TOKEN_ENDPOINT = 'http://127.0.0.1:8000/api/user/refresh'
    const { user, loading } = useAuth();
    const location = useLocation();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const [, getNewToken] = useFetch(REFRESH_TOKEN_ENDPOINT, null, "POST", false, refreshToken)
    const tokenIsValid = checkExpireToken();
    useEffect(()=>{
        
        if (!tokenIsValid) {
            console.log("Refresh requ");
            getNewToken().then((response)=>{
                if(response.access_token){
                    console.log(response.access_token);
                    localStorage.setItem('token', response.access_token);
                }
            })
        }
    },[getNewToken, refreshToken])

    const checkId = () => {
        const decoded = jwtDecode(token);
        const isCorrectId = (id == decoded.id)
        return isCorrectId
    }

    if (loading) {
        return null;  // Puedes cambiar esto por un componente de carga real
    }

    const sameId = checkId()
    
    if (!sameId) {

        return <Navigate to="/Error" state={{ from: location }} replace />;
    }

    if (!user || user.role != role || !tokenIsValid) {
        // Redirigir al usuario al login si no está autenticado
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
