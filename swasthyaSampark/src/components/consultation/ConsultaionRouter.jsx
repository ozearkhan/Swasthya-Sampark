import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Patient from "./patient/Patient.jsx";
import ChatBot from "./Chatbot/Chat.jsx";
import Doctor from "./Doctor/Doctor.jsx";
import Logout from "./Logout/Logout.jsx";
import Schedule from "./Doctor/Schedule.jsx";
import Room from "./Doctor/Room.jsx";
import PatientDataVisual from "./Doctor/PatientDataVisual.jsx";
import AiDoc from "./patient/AiDoc.jsx";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import RequestConsultation from "./patient/RequestConsulation.jsx";
import UploadReports from "./patient/UploadReports.jsx";
import RoleBasedRoute from "./RoleBasedRoute";

const ConsultationRouter = () => {
    const router = createBrowserRouter([
        {
            path: "doctor",
            element: <RoleBasedRoute component={Doctor} allowedRoles={["doctor"]} />,
        },
        {
            path: "patient",
            element: <RoleBasedRoute component={Patient} allowedRoles={["patient"]} />,
        },
        {
            path: "chat_bot",
            element: <RoleBasedRoute component={ChatBot} allowedRoles={["patient", "doctor"]} />,
        },
        {
            path: "logout",
            element: <RoleBasedRoute component={Logout} allowedRoles={["patient", "doctor"]} />,
        },
        {
            path: "doctor/schedule",
            element: <RoleBasedRoute component={Schedule} allowedRoles={["doctor"]} />,
        },
        {
            path: "doctor/schedule/:id",
            element: <RoleBasedRoute component={Room} allowedRoles={["doctor"]} />,
        },
        {
            path: "doctor_data_visualization",
            element: <RoleBasedRoute component={PatientDataVisual} allowedRoles={["doctor"]} />,
        },
        {
            path: "patient_request_consultation",
            element: <RoleBasedRoute component={RequestConsultation} allowedRoles={["patient"]} />,
        },
        {
            path: "ai_doctor",
            element: <RoleBasedRoute component={AiDoc} allowedRoles={["patient"]} />,
        },
        {
            path: "upload_reports",
            element: <RoleBasedRoute component={UploadReports} allowedRoles={["patient"]} />,
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default ConsultationRouter;