import { useState, useEffect } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';
import Transactions from './Transactions';
import Budget from './Budget'
import Errors from './Errors';
import Login from './Login';




function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [budgets, setBudgets] = useState([])
  const [trans, setTrans] = useState([])

  const clearError = () => {
    setError(null)
  }

  const getTransactions = () => {
    fetch("/api/transactions")
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to fetch transactions')
            }
            return resp.json()
        })
        .then(data => {
            setTrans(data)
        })
}

  const getBudgets = () => {

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
                <Route path="/" element={<Home user={user} trans={trans} clearError={clearError} setUser={setUser}/>}/>
                <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
                <Route path="/login" element={<Login getTransactions={getTransactions} isLoggedIn={isLoggedIn} clearError={clearError}/>}/>
                <Route path="/transactions" element={<Transactions trans={trans} setTrans={setTrans} getTransactions={getTransactions} isLoggedIn={isLoggedIn} user={user}/>}/>
                <Route path="/budget" element={<Budget trans={trans} budgets={budgets} user={user}/>}/>
              </Routes>
            </div>
          </div>
            
        </Router>
  )
}

export default App

