import React from "react";
import "../App.css"

const Errors = ({error}) => {

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