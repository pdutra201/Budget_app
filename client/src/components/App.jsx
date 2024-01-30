import { useState, useEffect } from 'react'
import {  BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
//import '/App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';
import '/home/pdutra/Development/code/phase-4/budget_app/client/node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.css'
import Errors from './Errors';
import Login from './Login';




function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  

  const clearError = () => {
    setError(null)
  }

  

  const isLoggedIn = data => {
    
    if (data.error){
      setError(data.error)
    }
    else{
      setUser(data)
      clearError()
    }
  }

  //let location = useLocation()

  // useEffect(() => {
  //   clearError()
  // }, [location])


  return (
    <body>
    <Router class="container">
      <NavBar user={user} />
      <Errors error={error}/>
      <Routes>
        <Route path="/" element={<Home user={user} clearError={clearError}/>}/>
        <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
      </Routes>
          
    </Router>  
    </body>
  )
}

export default App

