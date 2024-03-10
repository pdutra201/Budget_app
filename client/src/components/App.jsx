import { useState, useEffect } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';
import Transactions from './Transactions';
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


  return (
        <Router >

          <div style={{display: 'flex'}}>
            <div className='sidebar'>
              <NavBar user={user} />
            </div>
            <div className='main-content'>
              <Errors error={error}/>
              <Routes>
                <Route path="/" element={<Home user={user} clearError={clearError}/>}/>
                <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
                <Route path="/login" element={<Login isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
                <Route path="/transactions" element={<Transactions isLoggedIn={isLoggedIn} user={user}/>}/>
              </Routes>
            </div>
          </div>
            
        </Router>
  )
}

export default App

