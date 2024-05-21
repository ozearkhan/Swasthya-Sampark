

import './App.css'
import {HeroSection} from "./components/HeroSection.jsx";
import Section1 from "./components/Section1.jsx";
import {NavBar} from "./components/NavBar.jsx";




function App() {

  return (
    <>
        <NavBar></NavBar>
        <Section1>
            <HeroSection/>
        </Section1>
    </>
  )
}

export default App
