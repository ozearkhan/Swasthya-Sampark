// components/ErrorBoundary.jsx
import React from 'react';
import { Alert } from 'flowbite-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert color="failure">
                    <span className="font-medium">Alert!</span> Something went wrong. Please try refreshing the page.
                </Alert>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// atoms/symptomAtoms.js
import { atom } from 'recoil';

export const patientInfoState = atom({
    key: 'patientInfoState',
    default: { age: '', gender: '' },
});

export const medicalHistoryState = atom({
    key: 'medicalHistoryState',
    default: [],
});

export const selectedSymptomsState = atom({
    key: 'selectedSymptomsState',
    default: [],
});

export const currentStepState = atom({
    key: 'currentStepState',
    default: 0,
});

export const resultsState = atom({
    key: 'resultsState',
    default: null,
});

// hooks/useSocket.js
import { useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5
});

export function useSocket() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
        };
    }, []);

    const submitSymptom = useCallback((symptom) => {
        return new Promise((resolve, reject) => {
            socket.emit('submitSymptom', symptom, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }, []);

    const selectSymptoms = useCallback((symptoms) => {
        return new Promise((resolve, reject) => {
            socket.emit('selectSymptoms', symptoms, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }, []);

    const resetProcess = useCallback(() => {
        return new Promise((resolve) => {
            socket.emit('resetProcess', resolve);
        });
    }, []);

    return {
        socket,
        submitSymptom,
        selectSymptoms,
        resetProcess
    };
}
