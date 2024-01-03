import React from "react";
import {Link} from "react-router-dom";

function NavBar({ user, setUser}) {
    function handleLogoutClick() {
        fetch("/logout", {method: "DELETE"})
        .then((resp) => {
            if(resp.ok){
                setUser(null);
            }
        });
    }


    return (
        <header>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
            
                {user ? (
                <button onClick= {handleLogoutClick}>logout</button>
                ) : (
                    <ul>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                </ul>
                )}
                
                
            
        </header>
    )
}

export default NavBar;


