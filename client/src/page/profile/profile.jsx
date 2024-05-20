import React,{useState,useEffect} from 'react';
import img4 from '../../assets/1.png'
import Footer from '../../components/footer/footer';
import Navbar from '../../components/Navbar/navbar';
import axios from 'axios';
const Profile = () => {
    
    const [profileData, setProfileData]=useState(false);
    const [isLoggedIn,setIsLoggedIn]=useState(null);
    const[claimedProduct,setClaimedProducts]=useState([]);

  const token = JSON.parse(localStorage.getItem('Profile'));
  const checkAuthenticationAndFetchProfile = () => {
      
      console.log(token);
      if (token) {
          axios.get('http://https://safesecure.onrender.com/verifyToken', {
              headers: {
                  Authorization: `Bearer ${token.token}`
              }
          }).then(response => {
              // If token is valid, set isLoggedIn to true
              setIsLoggedIn(true);
              // Fetch profile data
              axios
        .get("http://https://safesecure.onrender.com/singleUser", {
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
  console.log(profileData);
  const getInitials = (name) => {
    return name ? name.slice(0, 1).toUpperCase() : '';
  };

  
  const fetchClaimedProducts = (userId) => {
    axios.get(`https://safesecure.onrender.com/claimedProducts/${userId}` ,userId)
        .then(response => {
            console.log('Claimed products:', response.data);
            // Handle the claimed products data, e.g., set state in a React component
            setClaimedProducts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the claimed products:', error);
        });
};

// Call this function when needed, for example after a user logs in
fetchClaimedProducts(profileData.id);
  return (
    <div>
        <Navbar/>
        <main className="profile-page mt-64">
      <section className=" block h-500-px">
        <div
          className="absolute top-0  w-full h-1/2 bg-center  bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <span id="blackOverlay" className="w-full top-full left-0 h-[3px] absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-32 h-1/2 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
            <div class="relative inline-flex items-center justify-center mt-5 w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
                <span class=" font-medium text-6xl text-gray-600 dark:text-gray-300 uppercase">{getInitials(profileData.name)}</span>
            </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal -mt-10 mb-2 text-blueGray-700 ">
                  <span>{profileData.name}</span>
                </h3>
                <div className=" leading-normal tracking-wider mt-0 mb-2 text-gray-500 font-medium">
                  <i className="fas fa-map-marker-alt mr-2 text-lg "></i>
                  {profileData.email}
                </div>
                
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      
    </main>
    
    <div className='flex'>  {claimedProduct && claimedProduct.map((product, index) => (                         
    <div key={index} class="mb-5 ml-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl
     hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
        <img class=" object-cover rounded-t-lg  h-full md:w-44  md:rounded-lg" src={img4} alt=""/>
        <div class="flex flex-col justify-between p-4 leading-normal transition">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">{product.product_name}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.product_type} Insurance </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.product_price}</p>
        </div>
    </div>
    ))}
    </div>
    <Footer/>

    </div>
    
  );
};

export default Profile;
