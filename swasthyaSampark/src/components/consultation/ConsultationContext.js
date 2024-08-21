import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from './services/api';

export const ConsultationContext = createContext();

export const ConsultationProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [doctorList, setDoctorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoleAndDoctorList = async () => {
            try {
                let token = localStorage.getItem('token');
                let roleData = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
                    token,
                });
                let doctorData = await axios.post(
                    `${BACKEND_URL}/api/consultation/getdoctor`,
                    {
                        token,
                    }
                );
                setRole(roleData.data.role);
                setDoctorList(doctorData.data.doctors);
            } catch (error) {
                console.error('Error fetching role and doctor list:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoleAndDoctorList();
    }, []);

    return (
        <ConsultationContext.Provider
            value={{ role, doctorList, isLoading }}
        >
            {children}
        </ConsultationContext.Provider>
    );
};