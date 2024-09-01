// deferRoleChecking.ts
import axios from "axios";
import {BACKEND_URL} from "./services/api.ts";
import { defer } from "react-router-dom";

async function roleChecking() {
  try {
    let token = localStorage.getItem("token");
    let data = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
      token,
    });
    console.log("roleChecking data:", data.data);
    return { role: data.data.role };
  } catch (error) {
    console.error("Error in roleChecking:", error);
    throw error;
  }
}

export default function deferRoleChecking() {
  return defer({ role: roleChecking() });
}