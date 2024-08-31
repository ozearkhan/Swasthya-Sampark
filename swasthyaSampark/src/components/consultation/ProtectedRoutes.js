import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {BACKEND_URL} from './services/api.ts';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/consultation', { state: { from: location }, replace: true });
                return;
            }

            try {
                const response = await axios.post(`${BACKEND_URL}/api/auth/verify`, { token });
                const role = response.data.role;
                setUserRole(role);

                if (!allowedRoles.includes(role)) {
                    navigate('/consultation', { state: { from: location }, replace: true });
                }
            } catch (error) {
                console.error('Token verification failed:', error);
                navigate('/consultation', { state: { from: location }, replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [navigate, location, allowedRoles]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return userRole && allowedRoles.includes(userRole) ? children : null;
};

export default ProtectedRoute;