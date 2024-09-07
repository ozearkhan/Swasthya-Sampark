import OurServices from "../components/landingPageComponents/OurServices.tsx";
import {NavBar} from "../components/navbar/NavBar.tsx";
import Footer from "../components/footer/Footer.tsx";

const ServicesPage =()=>{
    return <>
        <NavBar/>
        <div className="flex flex-col bg-[#F6F4F2] h-full w-screen m-0 pt-10 relative left-1/2 right-1/2 transform -translate-x-1/2 gap-[5%] md:gap-[3%] sm:gap-[2%] xs:gap-[1%]">
            <OurServices />
            <Footer/>
        </div>

    </>
}
export default ServicesPage;