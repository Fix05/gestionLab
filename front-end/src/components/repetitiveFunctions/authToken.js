import { jwtDecode } from 'jwt-decode';

export const checkExpireToken = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
};