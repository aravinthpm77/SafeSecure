import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from './page/home/home';
import Auth from "./page/Auth/auth";
import Auto from "./page/automobile/auto";
import Life from "./page/life/life";
import House from "./page/House/house";
import Travel from "./page/Travel/travel";
import Success from "./page/Payment/success";
import Profile from "./page/profile/profile";
const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path='/' element={<Auth/>}/>
            <Route exact path='/Home' element={<Home/>}/>
            <Route exact path='/Auto-policy' element={<Auto/>}/>
            <Route exact path='/Home-policy' element={<House/>}/>
            <Route exact path='/Life-policy' element={<Life/>}/>
            <Route exact path='/Travel-policy' element={<Travel/>}/>
            <Route exact path='/success' element={<Success/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
        </Routes>
    )
}
export default AllRoutes;