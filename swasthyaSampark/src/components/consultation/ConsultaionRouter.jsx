import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Patient from "./patient/Patient.tsx";
import ChatBot from "./Chatbot/Chat.tsx";
import Doctor from "./Doctor/Doctor.tsx";
import Logout from "./Logout/Logout.tsx";
import Schedule from "./Doctor/Schedule.tsx";
import Room from "./Doctor/Room.tsx";
import PatientDataVisual from "./Doctor/PatientDataVisual.tsx";
import PageNotFound from "./PageNotFound/PageNotFound.tsx";
import RequestConsultation from "./patient/RequestConsulation.tsx";
import UploadReports from "./patient/UploadReports.tsx";
import RoleBasedRoute from "./RoleBasedRoute.js";

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