import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {BACKEND_URL} from './services/api.ts';
import FallBackUi from './Fallback/FallbackUi';

const RoleBasedRoute = ({ component: Component, allowedRoles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/auth/verify`, { token });
                    setUserRole(response.data.role);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        verifyToken();
    }, []);

    if (isLoading) {
        return <FallBackUi />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/consultation" state={{ from: location }} replace />;
    }

    return <Component />;
};

export default RoleBasedRoute;