import React from "react";
import { Link } from "react-router-dom";
function RedirectButton({to,children}){
    return(
        <Link to={to}>
            <button className="px-16 text-sm">
                {children}
            </button>
        </Link>
    )


}
export default RedirectButton;