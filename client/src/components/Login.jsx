import React, { useState } from "react";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";

function Login(){
    
const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      
    },
    
    onSubmit: handleSubmit

  })




  function handleSubmit(values) {
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(r => r.json())
    .then(data => {
      isLoggedIn(data)
      if(!data.error){
        navigate('/')
      }
    })
  }

    return (
    
        <main>
      <form onSubmit={formik.handleSubmit}>
        <h1 style={{color:'black'}}>Login</h1>
        <label htmlFor="username"></label><br>
        </br>
        <input
          type="text"
          id="username"
          autoComplete="off"
          placeholder="Username"
          value={ formik.values.username}
          onChange={ formik.handleChange}
        />
        <br/>
        <label htmlFor="password"></label><br></br>
        <input
          type="password"
          id="password"
          value={ formik.values.password}
          placeholder="Password"
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        <hr/>
        <button style={{background: "blue", color:"white"}} type="submit">Login</button>
      </form>
    </main>
    
    )

}


export default Login