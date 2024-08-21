// deferRoleCheckingAndDoctors.js
import axios from "axios";
import BACKEND_URL from "./services/api";
import { defer } from "react-router-dom";

async function roleChecking() {
    try {
        let token = localStorage.getItem("token");
        let dataResponse = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
            token,
        });
        let doctorDataResponse = await axios.post(
            `${BACKEND_URL}/api/consultation/getdoctor`,
            {
                token,
            }
        );

        console.log("roleChecking data:", dataResponse.data);
        console.log("doctorData:", doctorDataResponse.data);

        return { role: dataResponse.data.role, doctorList: doctorDataResponse.data.doctors };
    } catch (error) {
        console.error("Error in roleChecking:", error);
        throw error;
    }
}

export default function deferRoleCheckingAndDoctors() {
    return defer({ role: roleChecking() });
}

