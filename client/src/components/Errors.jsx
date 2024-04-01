import React from "react";
import "../App.css"

const Errors = ({error}) => {
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