import { useNavigate, useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/NavBar.tsx";
import { useEffect } from "react";
export default function Logout() {
  const navigate = useNavigate();
  const role = useLoaderData();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  if (role === "doctor") {
    return (
      <>
        <Navbar isDoctor={true} isLogout={true} isPatient={false} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  } else if (role === "patient") {
    return (
      <>
        <Navbar isPatient={true} isLogout={true} isDoctor={false} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar isPatient={false} isDoctor={false} isLogout={false} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  }
}
