import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Patient from "./patient/Patient.jsx";
import ChatBot from "./Chatbot/Chat.jsx";
import roleChecking from "./roleChecking.js";
import Doctor from "./Doctor/Doctor.jsx";
import Logout from "./Logout/Logout.jsx";
import Schedule from "./Doctor/Schedule.jsx";
import Room from "./Doctor/Room.jsx";
import PatientDataVisual from "./Doctor/PatientDataVisual.jsx";
import AiDoc from "./patient/AiDoc.jsx";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import deferRoleChecking from "./deferRoleChecking.js";
import RequestConsultation from "./patient/RequestConsulation.jsx";
import deferRoleCheckingAndDoctors from "./deferRoleCheckingAndDoctors.js";
import UploadReports from "./patient/UploadReports.jsx";

const ConsultationRouter= () => {
    const router = createBrowserRouter([
        {
            path: "doctor",
            element: <Doctor />,
            loader: deferRoleChecking,
        },
        {
            path: "patient",
            element: <Patient />,
            loader: deferRoleChecking,
        },
        {
            path: "chat_bot",
            element: <ChatBot />,
            loader: deferRoleChecking,
        },
        {
            path: "logout",
            element: <Logout />,
            loader: roleChecking,
        },
        {
            path: "doctor/schedule",
            element: <Schedule />,
            loader: roleChecking,
        },
        {
            path: "doctor/schedule/:id",
            element: <Room />,
            loader: roleChecking,
        },
        {
            path: "doctor_data_visualization",
            element: <PatientDataVisual />,
            loader: roleChecking,
        },
        {
            path: "patient_request_consultation",
            element: <RequestConsultation />,
            loader: deferRoleCheckingAndDoctors,
        },
        {
            path: "ai_doctor",
            element: <AiDoc />,
            loader: deferRoleChecking,
        },
        {
            path: "upload_reports",
            element: <UploadReports />,
            loader: deferRoleChecking,
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default ConsultationRouter;