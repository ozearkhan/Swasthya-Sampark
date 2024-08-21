import Navbar from "../Navbar/NavBar.jsx";
import PatientPhoto from "/thumbnails/patient.png";
import { useLoaderData, Await } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/google_gif3.gif";
import { useNavigate } from "react-router-dom";
import { useState, Suspense } from "react";
import "./patient.css";
import BACKEND_URL from "../services/api";
import axios from "axios";
import FallBackUi from "../Fallback/FallbackUi";
import FallBackUi2 from "../Fallback/FallbackUi2";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
import { ThreeDots } from "react-loader-spinner";
import DoctorCard from "./DoctorCard";
import Copyright from "../Copyright/Copyright";

function RequestConsultation() {
    const loaderData = useLoaderData();
    const { role = 'noRole', doctorList = [] } = loaderData || {};
    const navigate = useNavigate();
    const [isPatient, setIsPatient] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
    const [showFlashy, setShowFlashy] = useState(false);
    const [sendingMail, setSendingMail] = useState(false);

    // Debugging: Log the initial data
    console.log("useLoaderData result:", { role, doctorList });
    console.log("isPatient state:", isPatient);
    console.log("isDoctor state:", isDoctor);
    console.log("isLogout state:", isLogout);

    // Handle fallback UI if loader data is not available
    if (!loaderData || !role || !doctorList) {
        return <FallBackUi />;
    }

    const requestDoctorLogin = async (id) => {
        try {
            setSendingMail(true);
            setIsLoading(true);
            let token = localStorage.getItem("token");

            console.log("Requesting doctor login for ID:", id);
            await axios.post(`${BACKEND_URL}/api/consultation/request/${id}`, {
                token,
            });
            window.location.reload();
        } catch (err) {
            console.error("Error in requestDoctorLogin:", err);
        } finally {
            setIsLoading(false);
            setSendingMail(false);
        }
    };

    return (
        <>
            <Suspense
                fallback={
                    <div className="main-loader-fallback">
                        <ThreeDots
                            visible={true}
                            height="120"
                            width="120"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                        />
                    </div>
                }
            >
                <Await resolve={role}>
                    {(resolvedRole) => {
                        // Debugging: Log the resolved role
                        console.log("Resolved role:", resolvedRole);

                        if (!resolvedRole) return <FallBackUi />;

                        if (resolvedRole === "doctor") {
                            navigate("/consultation/doctor");
                        }

                        if (isLoading && sendingMail) {
                            console.log("Sending mail in progress...");
                            return (
                                <>
                                    <h1 className="sendMail">Sending Mail to Doctor ✉️</h1>
                                    <FallBackUi2 />
                                </>
                            );
                        }

                        if (isLoading) {
                            console.log("Loading data...");
                            return <FallBackUi />;
                        }

                        if (resolvedRole === "noRole" && isEmailDuplicate) {
                            console.log("Duplicate email found for user.");
                            return (
                                <>
                                    <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
                                    <DuplicateEmail
                                        message={"A Doctor Account with This Email Already Exists"}
                                    />
                                    <h1 className="signHeading">Sign in as Patient</h1>
                                    <div className="mainLogin">
                                        {/* ... */}
                                    </div>
                                    <Copyright />
                                </>
                            );
                        }

                        if (resolvedRole === "noRole" && !isPatient && !isDoctor) {
                            console.log("User is not logged in as a patient or doctor.");
                            return (
                                <>
                                    {/* ... */}
                                </>
                            );
                        }

                        console.log("Rendering doctor list...");
                        return (
                            <>
                                <Navbar isPatient={true} isLogout={true} />
                                {showFlashy && (
                                    <SuccessMessage
                                        message={"You're Now Logged in as a Patient"}
                                    />
                                )}
                                <h1 style={{ margin: 0, fontWeight: "bold", padding: "30px" }}>
                                    Request Consultation
                                </h1>
                                {doctorList.length > 0 ? (
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
                                ) : (
                                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                                        No doctors available for consultation.
                                    </div>
                                )}
                                <Copyright />
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </>
    );
}

export default RequestConsultation;