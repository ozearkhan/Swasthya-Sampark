
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom"
import './App.css'


import LandingPage from "./pages/LandingPage.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";
import ConsultationPage from "./pages/ConsultationPage.tsx";





function App() {

  return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/survey" element={<SurveyPage/>}/>
                <Route path="/consultation" element={<ConsultationPage/>}/>
            </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
