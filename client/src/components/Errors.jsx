import React, {useContext} from "react";
import "../App.css"
import { UserContext } from "../context/UserContext";

const Errors = () => {

    const {error} = useContext(UserContext)

    //display error message if any in state
    return (
        <>
            {error && (
                <div className="error-message">
                <p>{error}</p>
                </div>
            )}
        </>
    )
}

export default Errors 