import React, { useState, useEffect } from "react";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";


function SignUp({ isLoggedIn, clearError }) {

  useEffect(() => {
    clearError()
  }, [])

  const navigate = useNavigate()

  const formSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required.")
    .min(8, "Password must be 8 characters long.")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number"),
      passwordConfirmation: Yup.string().when("password", (password, field) => {
        if (password) {
          return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
      }
    })
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: ""
    },
    validationSchema: formSchema,
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

    <main style={{margin:200}}>
      <form onSubmit={formik.handleSubmit}>
        <h1 style={{color:'black'}}>Sign Up</h1>
        <br/>
        <label htmlFor="username">Username</label><br>
        </br>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={ formik.values.username}
          onChange={ formik.handleChange}
        />
        <p style={{ color: 'red'}}>{formik.errors.username ? formik.errors.username : ""}</p>
        
        <label htmlFor="password">Password</label><br></br>
        <input
          type="password"
          id="password"
          value={ formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        <p style={{ color: 'red'}} >{formik.errors.password ? formik.errors.password : ""}</p>
        <label htmlFor="password">Password Confirmation</label><br></br>
        <input
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        <p style={{ color: 'red'}} >{formik.errors.passwordConfirmation ? formik.errors.passwordConfirmation: ""}</p>
        <hr/>
        <button style={{background: "blue", color:"white"}} type="submit">Sign Up</button>
        
      </form>
      
    </main>
  );
}

export default SignUp;