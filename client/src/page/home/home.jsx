import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Homedetails from "../../components/homedetails/homedetails";
import Insurance from "../../components/insurance/insurance";
import Contact from "../../components/contact/contact";
import Footer from "../../components/footer/footer";

const Home=()=>{
    return(
        <div className="justify-center w-fixed items-center overflow-x-hidden ">
            <Navbar className="z-10"  />
            <Homedetails/>
            <Insurance/>
            <Contact/>
            <Footer/>

            
            
        </div>
    )
}
export default Home;