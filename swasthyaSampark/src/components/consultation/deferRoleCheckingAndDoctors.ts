// deferRoleCheckingAndDoctors.ts
import axios from "axios";
import {BACKEND_URL} from "./services/api.ts";
import { defer } from "react-router-dom";

async function roleChecking() {
    try {
        let token = localStorage.getItem("token");
        let [dataResponse, doctorDataResponse] = await Promise.all([
            axios.post(`${BACKEND_URL}/api/auth/verify`, { token }),
            axios.post(`${BACKEND_URL}/api/consultation/getdoctor`, { token })
        ]);

        console.log("roleChecking data:", dataResponse.data);
        console.log("doctorData:", doctorDataResponse.data);

        return {
            role: dataResponse.data.role,
            doctorList: doctorDataResponse.data.doctors
        };
    } catch (error) {
        console.error("Error in roleChecking:", error);
        return { role: 'noRole', doctorList: [] };
    }
}

export default function deferRoleCheckingAndDoctors() {
    return defer({ role: roleChecking() });
}