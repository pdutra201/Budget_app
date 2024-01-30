import React, { useState, useEffect } from "react";

function Home({ user, clearError }) {

    useEffect(() => {
        clearError()
      }, [])

    if(user) {
        return <h1>Welcome, {user.username}!</h1>;
    }
    else {
        return <h1 style={{color:'black', margin:300}}>Welcome! Please login or signup to get started.</h1>
    }
}

export default Home;