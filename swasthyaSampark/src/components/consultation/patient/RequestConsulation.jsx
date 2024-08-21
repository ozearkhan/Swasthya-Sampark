import React, { useState, useEffect } from 'react';
import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.jsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';
import Copyright from '../Copyright/Copyright';
import BACKEND_URL from '../services/api';
import PatientPhoto from '/thumbnails/patient.png';
import button_logo from '/button_logo/google_gif3.gif';
import DoctorCard from './DoctorCard';
import './patient.css';

function RequestConsultation() {
  const { role, doctorList } = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showFlashy, setShowFlashy] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);

  useEffect(() => {
    if (role === 'doctor') {
      navigate('/consultation/doctor');
    }
  }, [role, navigate]);

  const requestDoctorLogin = async (id) => {
    try {
      setSendingMail(true);
      setIsLoading(true);
      let token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/api/consultation/request/${id}`, {
        token,
      });
      window.location.reload();
    } catch (err) {
      console.error('Error in requestDoctorLogin:', err);
    } finally {
      setIsLoading(false);
      setSendingMail(false);
    }
  };

  if (role === 'noRole' && !isPatient) {
    return (
        <div className="login-container">
          <Navbar isPatient={!isPatient} isDoctor={!isPatient} />
          <h1 className="signHeading">Sign in as Patient</h1>
          <div className="mainLogin">
            <img
                draggable="false"
                className="patient_image"
                src={PatientPhoto}
                alt="Patient"
            />
            <div className="login_with_google2">
              <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    setIsLoading(true);
                    try {
                      let data = await axios.post(
                          `${BACKEND_URL}/api/auth/generateTokenP`,
                          {
                            token: credentialResponse.credential,
                          }
                      );
                      if (data.data.token === 'tokenNotGranted') {
                        setIsEmailDuplicate(true);
                      } else {
                        localStorage.setItem('token', data.data.token);
                        setIsPatient(true);
                        setShowFlashy(true);
                      }
                    } catch (error) {
                      console.error('Login Failed', error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  onError={() => {
                    console.log('Google Login Failed');
                  }}
              />
              <img
                  draggable="false"
                  src={button_logo}
                  height={'230px'}
                  width={'230px'}
                  alt="Google Login"
                  style={{ padding: '20px', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          {isEmailDuplicate && (
              <DuplicateEmail message="A Doctor Account with This Email Already Exists" />
          )}
          <Copyright />
        </div>
    );
  }

  return (
      <div className="patient-page">
        <Navbar isPatient={true} isLogout={true} />
        {showFlashy && <SuccessMessage message="You're Now Logged in as a Patient" />}
        <h1 style={{ margin: 0, fontWeight: 'bold', padding: '30px' }}>
          Request Consultation
        </h1>
        <div className="doctorList">
          {doctorList.map((doctor, index) => (
              <DoctorCard
                  key={index}
                  name={`Doctor ${index + 1}`}
                  picture={doctor.picture}
                  uuid={doctor.uuid}
                  logicMagic={() => requestDoctorLogin(doctor.uuid)}
              />
          ))}
        </div>
        <Copyright />
      </div>
  );
}

export default RequestConsultation;