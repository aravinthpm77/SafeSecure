import React from "react";
import { useNavigate } from "react-router";
const Homedetails = () =>{
    const navigate= useNavigate();
    const handleClick1 = ()=>{
        navigate('/Auto-policy');
    };
    const handleClick2 = ()=>{
        navigate('/Life-policy');
    };
    const handleClick3 = ()=>{
        navigate('/Home-policy');
    };
    const handleClick4 = ()=>{
        navigate('/Travel-policy');
    };
    return(
        <div className="top-0 left-0 w-screen  sm:h-screen h-3/4 ">
            <div className="mt-14 -z-20 w-screen text-sm md:text-lg lg:text-xl">
                <p className="text-base w-screen  font-semibold py-3 bg-gray-200 text-sky-700 ">Our Commitment to Diversity , Equity , Inclusion</p>
                <div className="justify-center items-center w-screen font-semibold py-3  ">
                    <p className="font-sans p-5 text-5xl w-screen font-bold text-black/90 mt-3  ">Take the Worry Out of Life with<br/> Insurance Protection</p>
                    <p className="text-base text-gray-600 w-screen mr-80 mt-5 ">Building a Better World, One Policy at a Time
                    <br/>Ensuring Security, Empowering Futures</p>
                    <button className="w-48 h-12 mt-4 rounded mr-5 text-base text-gray-50 bg-slate-700  transition duration-300 ease-in-out hover:bg-slate-400 hover:text-gray-800">Get Started</button>
                    <button className="w-48 h-12 mt-4 rounded text-base text-gray-50 bg-slate-700 hover:bg-slate-400 transition duration-300 ease-in-out hover:text-gray-800" >Find the Match</button>
                </div>
                <div className="flex  flex-col sm:flex-row gap-5 mt-10   w-screen justify-center items-center  ">
                    <div onClick={handleClick1} className="bg-sky-50 sm:w-44 w-52 cursor-pointer justify-center grid rounded-xl border transition duration-300 ease-in-out border-sky-500 hover:bg-sky-100" >
                        <img className="relative mt-5 mx-auto my-auto w-12 h-12 justify-center" src="https://img.icons8.com/ios-filled/100/car.png" alt="car"/>
                        <p className="justify-center mb-5">Auto</p>
                        <button  className="text-base rounded-b-lg mt-3 sm:w-44 w-52 bg-slate-700 hover:bg-slate-800 font-semibold py-3 transition duration-300 ease-in-out text-white" >Buy Online</button>  
                   
                        
                    </div>
                    <div onClick={handleClick2} className=" bg-sky-50 sm:w-44 w-52  cursor-pointer  justify-center items-center grid rounded-xl border transition duration-300 ease-in-out border-sky-500 hover:bg-sky-100" >
                        <img className="mt-5 mx-auto my-auto w-12 h-12 justify-center" src="https://img.icons8.com/ios-filled/100/men-age-group-4.png" alt="car"/>
                        <p className="justify-center mb-5">Life</p>
                        <button  className="text-base rounded-b-lg mt-3 sm:w-44 w-52 bg-slate-700 hover:bg-slate-800 font-semibold py-3 transition duration-300 ease-in-out  text-white" >Buy Online</button>  
                   
                    </div>
                    <div onClick={handleClick3} className="bg-sky-50 sm:w-44 w-52  cursor-pointer  justify-center grid rounded-xl border transition duration-300 ease-in-out  border-sky-500 hover:bg-sky-100" >
                        <img className="mt-5 mx-auto my-auto justify-center" src="https://img.icons8.com/fluency-systems-filled/48/home.png" alt="car"/>
                        <p className="justify-center mb-5">Home</p>
                        <button  className="text-base rounded-b-lg mt-3 sm:w-44 w-52 bg-slate-700 hover:bg-slate-800 font-semibold py-3  transition duration-300 ease-in-out  text-white" >Buy Online</button>  
                   
                    </div>
                    <div onClick={handleClick4} className="bg-sky-50 sm:w-44 w-52 cursor-pointer  justify-center grid rounded-xl border transition duration-300 ease-in-out border-sky-500 hover:bg-sky-100" >
                        <img className="mt-5 mx-auto my-auto w-12 h-12 justify-center" src="https://img.icons8.com/ios-filled/100/bus.png" alt="bus"/>
                        <p className="justify-center mb-5">Travel</p>
                        <button  className="text-base rounded-b-lg mt-3 sm:w-44 w-52 bg-slate-700 hover:bg-slate-800 font-semibold py-3  transition duration-300 ease-in-out text-white" >Buy Online</button>  
                    </div>
                    

                </div>
                
            </div>
        </div>
    )
}
export default Homedetails;