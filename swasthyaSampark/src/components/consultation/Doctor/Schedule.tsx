import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar.tsx';
import Copyright from '../Copyright/Copyright';
import './doctor.css';

function Schedule() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = useCallback(() => {
        if (roomId) {
            navigate(`/consultation/doctor/schedule/${roomId}`);
        }
    }, [navigate, roomId]);

    return (
        <div className="doctor-wrapper">
            <Navbar isDoctor={true} isLogout={true} isPatient={false}/>
            <div className="consultation-room">
                <h1 className="consultation-room__title">Schedule Consultation</h1>
                <div className="consultation-room__form">
                    <input
                        className="consultation-room__input"
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                    />
                    <button
                        className="consultation-room__button"
                        onClick={handleJoinRoom}
                        disabled={!roomId}
                    >
                        Join Consultation
                    </button>
                </div>
            </div>
            <Copyright />
        </div>
    );
}

export default Schedule;
