import React, { useContext, useEffect } from "react";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login(){

const {isLoggedIn, clearError, getTransactions} = useContext(UserContext)

//clear error messages 
useEffect(() => {
  clearError()
}, [])


const navigate = useNavigate()


//set form values and make POST request when submit is clicked
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      
    },
    
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(r => r.json())
      .then(data => {
        isLoggedIn(data)
        if(!data.error){
          getTransactions()
          navigate('/')
        }
      })
    }
      
  })


    return (
    

      <div style={{margin:200}}>
        <form onSubmit={formik.handleSubmit}>
          <h1 style={{color:'black'}}>Login</h1>
          <br/>
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
        
    </div>
    
    )

}


export default Login