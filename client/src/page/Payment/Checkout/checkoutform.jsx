import React,{useState,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";


const CheckoutForm = ({ product }) => {


  const stripe = useStripe();
  const elements = useElements();
  

  const Navigate = useNavigate();
    
  const [profileData, setProfileData]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(null);
  

  const token = JSON.parse(localStorage.getItem('Profile'));
  const checkAuthenticationAndFetchProfile = () => {
      
      console.log(token);
      if (token) {
          axios.get('https://safesecure.onrender.com/verifyToken', {
              headers: {
                  Authorization: `Bearer ${token.token}`
              }
          }).then(response => {
              // If token is valid, set isLoggedIn to true
              setIsLoggedIn(true);
              // Fetch profile data
              axios
        .get("https://safesecure.onrender.com/singleUser", {
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
  console.log(profileData,"UserData");
  
if(profileData==null){
  const handleLogin = ()=>{
    Navigate('/Login')
  }
  const handleBack = ()=>{
    Navigate(-1);
  }
  return(

    <div className=" fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-60">
          <div className="justify-center bg-white p-16 rounded-md ">
            <h2 className=" text-2xl font-thin  ">Log In to Continue !! </h2>
            
            
            <div className="justify-center flex gap-5">
              <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                OK
              </button>
              <button onClick={handleBack} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Close
              </button>

            </div>
            
          </div>
        </div>
  )
}

  const handleSubmit = async (event) => {

    const onClose=()=>{

    }

    event.preventDefault();
    console.log(product,1);
    const products = [product];

    const productId=products[0].id;
    const productType=products[0].type;
    const userId=profileData?.id;
    
    console.log(productId,productType,userId);
    try {
      
      
      const response = await axios.post('https://safesecure.onrender.com/create-checkout-session', { products });
      const productresponse=await axios.post('https://safesecure.onrender.com/claimProduct',{
        productId,
        userId,
        productType
      });
      
      
      
      
      if (response.status === 200) {
        const { url } = response.data;
        
        window.location.href = url;
        if(productresponse.status==200){
          
          toast.success("Claimed Successfully");
        }
        
      } else {
        // Handle non-200 status codes
        console.error('Error:', response.statusText);
        toast.error('Error occurred while creating checkout session.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while creating checkout session.');
    }
  };

  
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="px-12 py-[9px] rounded-md text-white bg-rose-600 hover:text-gray-100 hover:bg-rose-700" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};
export default CheckoutForm;
