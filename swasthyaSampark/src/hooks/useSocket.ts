import { useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import {BACKEND_URL} from "../components/consultation/services/api.ts";

const socket = io(BACKEND_URL, {
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