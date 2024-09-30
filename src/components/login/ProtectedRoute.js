import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Moved inside useEffect
        const token = localStorage.getItem('token');
        let activityTimeout;

        // Refresh token if it is about to expire within 60 seconds
        const refreshToken = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/admin/refresh-token`, {
                    token: localStorage.getItem('token'), // You don't need to re-declare `token`
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

        // Handle user activity (mouse movement or key press)
        const handleUserActivity = () => {
            clearTimeout(activityTimeout);

            // Check token expiration and refresh if needed
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                
                // If token expires in less than 60 seconds, refresh it
                if (decoded.exp - currentTime < 60) {
                    refreshToken();
                }
            }

            // Set a timeout to log out the user after 5 minutes of inactivity
            activityTimeout = setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/login');
            }, 5 * 60 * 1000);
        };

        // Validate token existence and expiration
        const validateToken = () => {
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Check if token has expired
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setIsAuthenticated(true);
                    // Add event listeners for user activity
                    document.addEventListener('mousemove', handleUserActivity);
                    document.addEventListener('keydown', handleUserActivity);
                }
            } catch (error) {
                navigate('/login');
            }
        };

        validateToken();

        // Cleanup event listeners on component unmount
        return () => {
            clearTimeout(activityTimeout);
            document.removeEventListener('mousemove', handleUserActivity);
            document.removeEventListener('keydown', handleUserActivity);
        };
    }, [navigate, apiUrl]);  // Removed `token` from the dependencies

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
