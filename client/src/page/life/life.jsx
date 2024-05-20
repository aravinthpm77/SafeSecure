import React, { useState ,useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from '../Payment/Checkout/checkoutform'
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
const stripePromise = loadStripe('pk_test_51PH4YqSCqTpCrJFxSfEtZWhpZ674A6GKyz8OHH4VV87vIcigXYEaRN9N67y9xj2irWFOTCvCNJh1DDZ9OwLUOkaQ00YMUcMANq');

const ProductDetails = ({ product, onClose }) => {
    return (
      <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-8 rounded-lg">
          <h2 className=" text-3xl font-thin uppercase mb-4">Product Details</h2>
          <p className="text-xl "><strong>Name:</strong> {product.name}</p>
          <p className="text-xl "> <strong>Price: </strong> ₹ {product.price}</p>
          <h3 className="text-xl  font-semibold mt-4">Features:</h3>
          <ul className="list-none   mb-5">
            {product.details.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Elements stripe={stripePromise}>
            <CheckoutForm product={product} />
          </Elements>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    );
  };
  
const Life =()=>{
    const[selectedProduct , setSelectedProduct]=useState(null);
    const handleBuyClick = (product) => {
        setSelectedProduct(product);
      };
    const closeProductDetails = () => {
    setSelectedProduct(null);
    };
    
    const products = [
        { name: "FIRST", price: "0", details: ["Unlimited updates"] },
        { name: "Basic", price: "1099", details: ["Unlimited updates", "Git repository", "npm installation"] },
        { name: "Advanced", price: "2499", details: ["Unlimited updates", "Git repository", "npm installation", "Code examples", "Premium snippets"] },
        { name: "Enterprise", price: "3499", details: ["Unlimited updates", "Git repository", "npm installation", "Code examples", "Premium snippets", "Premium support", "Drag&Drop builder"] }
    ];

    
    const [profileData, setProfileData]=useState(false);
    const [isLoggedIn,setIsLoggedIn]=useState(null);
    

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
    console.log(profileData,"Life");
    

    return(
        <div>
            <div>
                <Navbar/>
                <div className= " container mt-14 h-auto  ">
                    <div className="ml-10 mt-16">
                        <h3 className="text-[40px] font-bold font-sans text-left tracking-tighter ">Life Insurance</h3>
                        <p className=" text-left w-5/6 mt-5" >Life insurance is a contract between an insurance company and a policyholder, where the insurer agrees to pay a beneficiary a sum of money upon the policyholder's death. The policyholder is responsible for making regular payments, while the insured person is the one whose death triggers the payment of the death benefit. The policy may remain in force as long as the policyholder pays the premiums on time.Life insurance is a contract between an insurance company and a policyholder, where the insurer agrees to pay a beneficiary a sum of money upon the policyholder's death. The policyholder is responsible for making regular payments, while the insured person is the one whose death triggers the payment of the death benefit. The policy may remain in force as long as the policyholder pays the premiums on time .</p>

                    </div>
                    <div class=" my-24 p-3 mx-auto md:px-6 bg-slate-200">
  
                        <section class="mb-20 text-center">
                            <h2 class="mb-16 text-3xl font-bold mt-3">
                            Why is it so<u class="text-slate-800 text-[36px] dark:text-primary-400"> great?</u>
                            </h2>
                            <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
                            <div class="mb-12 md:mb-0">
                                <div class="mb-6 inline-block rounded-full bg-slate-300 p-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" className="h-6 w-6 ">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>
                                </div>
                                <h5 class="mb-4 text-lg font-bold">Support 24/7</h5>
                                <p class="text-neutral-500 dark:text-neutral-600">
                                Laudantium totam quas cumque pariatur at doloremque hic quos quia
                                eius. Reiciendis optio minus mollitia rerum labore facilis
                                inventore voluptatem ad, quae quia sint. Ullam.
                                </p>
                            </div>

                            <div class="mb-12 md:mb-0">
                                <div class="mb-6 inline-block rounded-full bg-slate-300 p-3 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                                </div>
                                <h5 class="mb-4 text-lg font-bold">Safe and solid</h5>
                                <p class="text-neutral-500 dark:text-neutral-600">
                                Eum nostrum fugit numquam, voluptates veniam neque quibusdam ullam
                                aspernatur odio soluta, quisquam dolore animi mollitia a omnis
                                praesentium, expedita nobis!
                                </p>
                            </div>

                            <div class="mb-12 md:mb-0">
                                <div class="mb-6 inline-block rounded-full bg-slate-300 p-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                </div>
                                <h5 class="mb-4 text-lg font-bold">Extremely fast</h5>
                                <p class="text-neutral-500 dark:text-neutral-600">
                                Enim cupiditate, minus nulla dolor cumque iure eveniet facere
                                ullam beatae hic voluptatibus dolores exercitationem? Facilis
                                debitis aspernatur amet nisi?
                                </p>
                            </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div>
                    <div class="container  my-24 mx-auto md:px-6  ">
 
                        <section >
                            <h2 class="mb-6 text-center text-4xl font-medium">Pricing</h2>

                            <p class="mb-12 text-center text-neutral-500 dark:text-neutral-700/75">
                            Financial coverage to the insured car against road accidents, theft, and fire.
                            </p>

                            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12  ">
                            {products.map((product, index) => (
                                <div key={index} className="mb-6 lg:mb-0">
                                    <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-400">
                                        <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-50">
                                            <p className="mb-4 text-sm uppercase">
                                                <strong>{product.name}</strong>
                                            </p>
                                            <h3 className="mb-6 text-3xl">
                                                <strong>₹ {product.price}</strong>
                                            </h3>
                                             
                                            <button
                                                type="button"
                                                className="inline-block w-full rounded bg-slate-800/90 hover:bg-slate-800 shadow-[0_4px_9px_-4px_#3b71ca] text-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:bg-slate-600/60 focus:text-black focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                                onClick={() => handleBuyClick(product)}
                                            >
                                                Buy
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <ol className="list-inside">
                                                {product.details.map((feature, i) => (
                                                <li key={i} className="mb-4 flex">
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    className="mr-3 h-5 w-5 text-primary dark:text-primary-400"
                                                    >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                    </svg>
                                                    {feature}
                                                </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </section>
                        
                        </div>
                        {selectedProduct && (
                        <ProductDetails 
                            product={selectedProduct}
                            onClose={closeProductDetails}
                        />
                        )}

                    </div>
               <Footer/>
            </div>
        </div>
    )
}
export default Life;