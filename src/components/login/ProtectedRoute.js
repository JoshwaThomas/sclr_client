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
        if (!token) {
            navigate('/login');
        } else {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else if (decoded.exp - currentTime < 60) {
                    // Token is about to expire in less than a minute, refresh it directly in useEffect
                    (async () => {
                        try {
                            const response = await axios.post(`${apiUrl}/api/admin/refresh-token`, {
                                token: localStorage.getItem('token'),
                            });
                            if (response.data.status === 'success') {
                                localStorage.setItem('token', response.data.newToken); // Store the new token
                                setIsAuthenticated(true);
                            } else {
                                navigate('/login');
                            }
                        } catch (error) {
                            console.log('Token refresh failed:', error);
                            navigate('/login');
                        }
                    })();
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                navigate('/login');
            }
        }
    }, [navigate, apiUrl]);


    if (!isAuthenticated) {
        return null; 
    }

    return children;
};

export default ProtectedRoute;