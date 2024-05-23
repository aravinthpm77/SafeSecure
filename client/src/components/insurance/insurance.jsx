import React from "react";
import img1 from "../../assets/img1.jpg";

const Insurance = () => {
  return (
    <div className="text-center sm:text-left pb-10 top-0 left-0  w-screen h-fit sm:h-screen sm:mt-0 mt-7 bg-slate-200">
      <div className="  py-7 sm:ml-20 w-96">
        <h2 className="font-sans text-4xl font-bold tracking-tight text-sky-950">
          Why Insurance ?
        </h2>
        <p className="font-sans text-xl t-racking-wide font-bold mt-2">
          Strength that speaks for itself
        </p>
      </div>
      <div className="sm:flex  grid sm:mx-20 mx-10 sm:h-3/4 gap-5    ">
        <div className="bg-sky-950 text-white  text-left rounded-2xl h-full sm:mb-10 sm:mr-0 mr-5 mb-5 sm:w-screen w-10/12">
          <h2 className="sm:p-10 p-7 font-sans sm:text-5xl text-3xl font-bold text-yellow-300 ">
            4 Years of Trust
          </h2>
          <div className="ml-10 my-4 ">
            <div className="sm:mb-6 mb-3 ">
              <p className="sm:text-xl text-sm  font-medium text-gray-300">Policies Issued</p>
              <h3 className="sm:text-4xl text-2xl font-sans font-bold">8 Cr.</h3>
            </div>
            <div className="sm:mb-6 mb-3">
              <p className="sm:text-xl text-sm  font-medium text-gray-300">
                1st Year Premium Income
              </p>
              <h3 className="sm:text-4xl text-2xl font-sans font-bold">&#8377; 2,13,000 Cr.</h3>
            </div>
            <div className="sm:mb-6 mb-3">
              <p className="sm:text-xl text-sm  font-medium text-gray-300">Policies Markt Income</p>
              <h3 className="sm:text-4xl text-2xl font-sans font-bold">58%</h3>
            </div>
          </div>
        </div>


        <div className="bg-cover bg-bottom rounded-2xl text-white text-left h-full sm:mb-10 sm:mr-0 mr-5 mb-5 sm:w-screen w-10/12" style={{ backgroundImage: `url(${img1})` }}>
          <h2 className="sm:text-4xl text-3xl text-left sm:p-10 p-7 font-sans font-bold text-sky-950">
            Claim Performance
          </h2>

          <div className="ml-10 my-4 sm:flex grid gap-5">

            <div className="sm:mb-6 mb-3">
              <p className="sm:text-base text-sm  font-medium text-gray-300">Claim settlement</p>
              <h3 className="sm:text-3xl text-lg font-sans font-bold">92.65%</h3>
              <button className="bg-sky-900 py-1 px-3 text-sm rounded-full mt-2 transition duration-300 ease-in-out hover:bg-sky-950">
                Instant claim
              </button>
            </div>
            <div className="sm:mb-6 mb-3 sm:block hidden">
              <p className="sm:text-base text-sm  font-medium text-gray-300">No. of Claims Settled</p>
              <h3 className="sm:text-3xl text-lg font-sans font-bold"> 21 Cr.</h3>
              <button className="bg-sky-900 py-1 px-3 text-sm rounded-full mt-2 transition duration-300 ease-in-out hover:bg-sky-950">
                Single day processing
              </button>
            </div>
            <div className="sm:mb-6 mb-3 ">
              <p className="sm:text-base text-sm  font-medium text-gray-300">Claims amount paid</p>
              <h3 className="sm:text-3xl text-lg font-sans font-bold">&#8377; 21,3 Cr.</h3>
              <button className="bg-sky-900 text-sm py-1 px-3 rounded-full mt-2 transition duration-300 ease-in-out hover:bg-sky-950">
                24*7 Customer Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
