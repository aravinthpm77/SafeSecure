import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

import { useNavigate } from 'react-router-dom'; 
const Navbar=()=>{
    

    
      const navigate = useNavigate();
    
      const handleLogout = () => {
        
        localStorage.removeItem('Profile');
        localStorage.removeItem('UserDetails');
        
    
        
        navigate('/login');
      };
    
    

      
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [profileData, setProfileData] = useState(null);
      const token = JSON.parse(localStorage.getItem('Profile'));
      const checkAuthenticationAndFetchProfile = () => {
          
          console.log(token);
          if (token) {
              axios.get('http://localhost:5000/verifyToken', {
                  headers: {
                      Authorization: `Bearer ${token.token}`
                  }
              }).then(response => {
                  // If token is valid, set isLoggedIn to true
                  setIsLoggedIn(true);
                  // Fetch profile data
                  axios
            .get("http://localhost:5000/singleUser", {
              headers: { Authorization: `Bearer ${token.token}` },
            })

                    .then(response => {
                        // Set profile data in state
                        setProfileData(response.data);
                    }).catch(error => {
                        console.error("Error fetching profile data:", error);
                    });
              }).catch(error => {
                  // If token is invalid, log out user and remove token from local storage
                  setIsLoggedIn(false);
                  localStorage.removeItem('Profile');
                  localStorage.removeItem('UserDetails');
                  // Clear profile data
                  setProfileData(null);
              });
          } else {
              // If no token found, set isLoggedIn to false and clear profile data
              setIsLoggedIn(false);
              setProfileData(null);
          }
      };

      console.log(profileData)
  
      
  
      useEffect(() => {
          
          checkAuthenticationAndFetchProfile();
      }, []);
      console.log(profileData,"Navbar");



    return (
        <nav className='bg-white fixed top-0 left-0 w-screen h-14 flex items-center justify-between shadow-md z-50'>
            <div className='flex items-center h-auto'>
                
               
                

                <p className="px-4 h-auto justify-center  uppercase font-medium tracking-widest text-sky-700 ">Insurance</p>

                <div className="h-max flex items-center">
                    <Link to="/Home" className="h-14 text-black transition duration-3000 ease-in hover:text-white hover:bg-sky-100 ">
                        <p className="px-4 py-4 justify-center font-normal tracking-widest text-sky-700 ">Home</p>


                    </Link>
                    <Link to='/profile' className="h-14 text-black transition duration-3000 ease-in hover:text-white hover:bg-sky-100 " >
                        <p className="px-4 py-4 justify-center font-normal tracking-widest text-sky-700 ">Profile</p>
                        
                    </Link>

                    {isLoggedIn ? (

                    <>
                    <Link to='/' className=" h-14 text-black transition duration-3000 ease-in hover:text-white hover:bg-sky-100 ">
                        <p className="px-4 py-4 justify-center font-normal tracking-widest text-sky-700 " onClick={handleLogout}>Log Out</p>
                        
                    </Link>
                    
                    </>
                    )
                    :(
                    <Link to='/' className="h-14 text-black transition duration-3000 ease-in hover:text-white hover:bg-sky-100 ">
                                <p className="px-4 py-4 justify-center font-medium text-base tracking-widest text-gray-700">Log In</p>
                    </Link>

                    )}
                    
                    

                </div>
                

                
            </div>
        </nav>
    )
}

export default Navbar