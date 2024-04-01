import React from "react";
import {Link} from "react-router-dom";
import '/home/pdutra/Development/code/phase-4/budget_app/client/node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.css'


function NavBar({ user, setUser}) {

    // send DELETE request to db to log out user
    function handleLogoutClick() {
        fetch("/api/logout", {method: "DELETE"})
        .then((resp) => {
            if(resp.ok){
                setUser(null)
            }
        });
    }


    return (
        <form id = "page-top"> 
            <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <hr className="sidebar-divider"></hr>

                {user ? (
                <div>
                <li className="nav-item"><Link className="nav-link" to="/budget">Budget</Link></li>
                <hr className="sidebar-divider"></hr>
                <li className="nav-item"><Link className="nav-link" to="/transactions">Transactions</Link></li>
                <hr className="sidebar-divider"></hr>
                <button onClick= {handleLogoutClick}>logout</button>
                </div>
                ) : (
                    <div>                    
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <hr className="sidebar-divider"></hr>
                        <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                        </div>
                )}
                
                </ul>
            </div>
        </form>
    )
}

export default NavBar;


