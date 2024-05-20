import React, { useState ,useRef,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Auth = ()=>{
    const [isSignup,setIsSignup]=useState(false);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [formSubmitted,setformSubmitted]=useState(false);
    const formRef=useRef(null);
    const navigate = useNavigate();
    
    const handleSwitch =()=>{
        setIsSignup(!isSignup);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(name,email,password,"Email Details");
        try{
            if(isSignup){
                axios.post('http://localhost:5000/auth',{name,email,password})
                .then(
                    res=>toast.success("Created Successfully" )
                    )
                     
                .catch(err=>alert(err,"error"));
                    
                setformSubmitted(true);
                navigate('/');
            }
            if(!isSignup){
                try{
                    if (email === "admin@gmail.com" && password==="admin@123" ) {
                        navigate("/admin"); 
                    } 
                    else {
                        const response= axios.post('http://localhost:5000/login',{email,password})

                        .then(response => {
                            console.log(response.data.token,1);
                            
                            if (response.data && response.data.Status === 'Success') {
                                toast.success('Logged In');
                                localStorage.setItem("UserDetails",JSON.stringify({name:response.data.name ,email,password}));
                                
                                localStorage.setItem("Profile",JSON.stringify({token:response.data.token}));
                                navigate('/home');
                            } else {
                                toast.warning(`Warning: ${response.data.Error}`);
                        }})

                        
                        
                        .catch(error => {
                            console.error('Error:', error);
                            toast.error("Error Login");
                        }); 
                           
                        
                        
                            setformSubmitted(true);
                            
                    }

                }
                catch(error){
                    console.log("Login Error",error);
                }
                
                
                
                    
                
            }
        }
        
        catch(error){
            console.error('Authentication Error',error);
        }
    }
    
    return(
        <div className="bg-teal-200 h-screen w-screen flex justify-center items-center">
        <div className="mt-10 bg-rgba-162-248-251-955 ml-16 px-2 py-5">
            <form className="flex flex-col items-center justify-center bg-white/50 p-10 w-80 rounded-lg" onSubmit={handleSubmit}>
               <p className="text-2xl uppercase text-gray-800 tracking-wide"> {isSignup ? 'Sign Up' :'Log In'}</p>
                {isSignup &&  
                
                <label >
                    <input type="text" onChange={(e)=>{setName(e.target.value)}} className="bg-white  mt-7 px-5 py-3 w-56 border-none rounded-md"   placeholder="Enter the name"/>
                    

                </label>
                }
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-white mt-7 px-5 py-3 w-56 border-none rounded-md"  placeholder="Enter the Email"  />
                
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-white mt-7 px-5 py-3 w-56 border-none rounded-md" placeholder="Enter the Password"  />
                


                <button  className="mt-10 bg-teal-300 w-56 h-10 text-base uppercase rounded-full text-gray-800 tracking-wide transition duration-300 ease-in-out hover:bg-rgb-29-180-175 hover:text-white hover:bg-teal-600" type="submit" >{isSignup ? 'Sign UP' : 'Log In'}</button>



            </form>
            <p className="text-sm mt-25 mx-20 tracking-wide grid mt-5">
                {isSignup ? 'Already have account':'Create new account'}
                <button type="button"  onClick={handleSwitch} className="text-teal-500 text-base uppercase tracking-widest cursor-pointer font-normal hover:text-teal-950" > {isSignup ? 'Log In' : 'Sign Up'}</button>
                
            </p>
        </div>
        
        
       
       </div> 
       
    
    )
}
export default Auth;