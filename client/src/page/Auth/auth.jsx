import React, { useState ,useRef,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../../assets/4755623.jpg'
import img2 from '../../assets/5695091.jpg'

const Auth = ()=>{
    const [isSignup,setIsSignup]=useState(false);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [formSubmitted,setFormSubmitted]=useState(false);
    const formRef=useRef(null);
    const navigate = useNavigate();
    
    const handleSwitch =()=>{
        setIsSignup(!isSignup);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, "Email Details");

        try {
            if (isSignup) {
                await handleSignup();
            } else {
                await handleLogin();
            }
        } catch (error) {
            console.error('Authentication Error', error);
        }
    }
    const handleSignup = async () => {
        try {
            const response = await axios.post('https://safesecure.onrender.com/auth', { name, email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Created Successfully");
            toast.success("LogIn Now");
            setFormSubmitted(true);
            navigate('/Login');
        } catch (error) {
            console.error('Signup Error:', error.response || error);
            toast.error("Error: " + (error.response?.data?.message || error.message));
        }
    }

    const handleLogin = async () => {
        try {
            if (email === "admin@gmail.com" && password === "admin@123") {
                navigate("/admin");
            } else {
                const response = await axios.post('https://safesecure.onrender.com/login', { email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data && response.data.Status === 'Success') {
                    toast.success('Logged In');
                    
                    localStorage.setItem("UserDetails", JSON.stringify({ name: response.data.name, email, password }));
                    localStorage.setItem("Profile", JSON.stringify({ token: response.data.token }));
                    navigate('/');
                } else {
                    toast.warning(`Warning: ${response.data.Error}`);
                }
            }
        } catch (error) {
            console.error('Login Error:', error.response || error);
            toast.error("Error Login");
        }
    }

    
    return(
        <div className="bg-black/30 h-screen w-screen flex justify-center fixed items-center">
        <div className=" justify-center   w-4/12 ">
            <img className="absolute -z-10  -ml-96  mt-72 sm:mt-80 sm:ml-80 " src={img1}/>
            <img src={img2} className="absolute  -z-10 sm:-ml-64  -mt-64  sm:-mt-24"/>
            <form className="z-10 flex flex-col items-center justify-between   bg-white/30 -ml-20 sm:ml-0 h-full p-10 w-fit  sm:w-full rounded-lg " onSubmit={handleSubmit}>
               <p className="text-2xl uppercase text-gray-800 tracking-wide"> {isSignup ? 'Sign Up' :'Log In'}</p>
                {isSignup &&  
                
                <label >
                    <input type="text" onChange={(e)=>{setName(e.target.value)}} className="bg-white  mt-7 px-14 py-3  border-none rounded-md"   placeholder="Enter the name"/>
                    
                </label>
                }
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-white mt-7 px-14 py-3 border-none rounded-md"  placeholder="Enter the Email"  />
                
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-white mt-7 px-14 py-3 border-none rounded-md" placeholder="Enter the Password"  />
                


                <button  className="mt-10 bg-teal-300 w-56 h-10 text-base uppercase rounded-full text-gray-800 tracking-wide transition duration-300 ease-in-out hover:bg-rgb-29-180-175 hover:text-white hover:bg-teal-600" type="submit" >{isSignup ? 'Sign UP' : 'Log In'}</button>


                <p className=" flex gap-3 text-sm  my-36 tracking-wide mt-5">
                {isSignup ? 'Already have an account':'Create new account'}
                <button type="button"  onClick={handleSwitch} className="text-teal-500 text-base uppercase tracking-widest cursor-pointer font-normal hover:text-teal-950" > {isSignup ? 'Log In' : 'Sign Up'}</button>
                
                </p>

            </form>
            
        </div>
        
        
       
       </div> 
       
    
    )
}
export default Auth;