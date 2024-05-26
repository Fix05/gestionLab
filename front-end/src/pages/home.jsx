import { useAuth } from '../contexts/authenticationContext'
import { Navigate, useLocation } from 'react-router-dom';

export default function Home () {

    const {user} = useAuth()
    const location = useLocation()

    if(user.role == "Manager"){
        return <Navigate to={`/Manager/${user.id}/dashboard`} state={{ from: location }} replace />;
    }

    if(user.role == "USer"){
        return <Navigate to={`/User/${user.id}/mainPage`} state={{ from: location }} replace />;
    }



}