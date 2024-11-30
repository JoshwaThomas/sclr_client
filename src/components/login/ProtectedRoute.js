import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        let activityTimeout;

        const refreshToken = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/admin/refresh-token`, {
                    token: localStorage.getItem('token'),
                });
                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.newToken);
                    setIsAuthenticated(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.log('Token refresh failed:', error);
                navigate('/login');
            }
        };

        const handleUserActivity = () => {
            clearTimeout(activityTimeout);
        
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
        
                // Check if token is close to expiry (e.g., less than 5 minutes remaining)
                if (decoded.exp - currentTime < 300) { // 5 minutes buffer
                    refreshToken();
                }
            }
        
            // Reset the timeout for 30 minutes inactivity
            activityTimeout = setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/login');
            }, 30 * 60 * 1000);
        };

        const validateToken = () => {
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setIsAuthenticated(true);
                    document.addEventListener('mousemove', handleUserActivity);
                    document.addEventListener('keydown', handleUserActivity);
                }
            } catch (error) {
                navigate('/login');
            }
        };

        validateToken();

        return () => {
            clearTimeout(activityTimeout);
            document.removeEventListener('mousemove', handleUserActivity);
            document.removeEventListener('keydown', handleUserActivity);
        };
    }, [navigate, apiUrl]);

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;