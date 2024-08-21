import { Link } from "react-router-dom";
import "./navbar.css";
// import navbarLogo from "../../public/navbar/Group.svg";

import Logo from "../components/Logo.jsx";
export default function Navbar({ isPatient, isDoctor, isLogout }) {
  const handleLogoClick = () => {
    window.location.href = 'http://localhost:5173';
  }
  return (
    <>
      <div className="main_navbar">
        <div style={{paddingTop: "10px", paddingLeft: "10px"}} onClick={handleLogoClick}>
            <Logo/>
        </div>

        <div className="navbar">
          {/*<Link to="/">Home</Link>*/}
          {isPatient && <Link to="/consultation/patient">Patient</Link>}
          {isDoctor && <Link to="/consultation/doctor">Doctor</Link>}
          {/*<Link to="/ai_doctor">AI Doctor</Link>*/}
          <Link to="/consultation/chat_bot">AI Assistant</Link>

          {isLogout && (
            <Link style={{ color: "red" }} to="/consultation/logout">
              <b>Logout</b>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
