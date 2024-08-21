// deferRoleCheckingAndDoctors.js
import axios from "axios";
import BACKEND_URL from "./services/api";
import { defer } from "react-router-dom";

async function roleChecking() {
    try {
        let token = localStorage.getItem("token");
        let data = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
            token,
        });
        console.log("roleChecking data:", data.data);
        let doctorData = await axios.post(
            `${BACKEND_URL}/api/consultation/getdoctor`,
            {
                token,
            }
        );
        console.log("doctorData:", doctorData.data);
        return { role: data.data.role, doctorList: doctorData.data.doctors };
    } catch (error) {
        console.error("Error in roleChecking:", error);
        throw error;
    }
}

export default function deferRoleCheckingAndDoctors() {
    return defer({ role: roleChecking() });
}