

import './App.css'
import {HeroSection} from "./components/HeroSection.jsx";
import Section1 from "./components/Section1.jsx";
import {NavBar} from "./components/NavBar.jsx";
import {HeroSectionBottomDiv} from "./components/HeroSectionBottomDiv.jsx";




function App() {

  return (
    <>
        <NavBar></NavBar>
        <Section1>
            <HeroSection/>
            <HeroSectionBottomDiv></HeroSectionBottomDiv>
        </Section1>
    </>
  )
}

export default App
