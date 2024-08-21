import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Navbar from '../Navbar/NavBar.jsx';
import Copyright from '../Copyright/Copyright';
import './doctor.css';

function Room() {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        const initializeRoom = async () => {
            const appID = 1653169076;
            const serverSecret = 'ba466bb173ccdb251b277891fafcc1d2';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                id,
                Date.now().toString(),
                'User'
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: containerRef.current,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `https://app.connect-health.xyz/doctor/schedule/${id}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: false,
                onLeaveRoom: () => navigate('/'),
            });
        };

        initializeRoom();
    }, [id, navigate]);

    return (
        <>
            <Navbar isPatient={true} isDoctor={true} isLogout={true} />
            <div className="consultation-room">
                <h1 className="consultation-room__title">Consultation Room</h1>
                <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
            </div>
            <Copyright />
        </>
    );
}

export default Room;