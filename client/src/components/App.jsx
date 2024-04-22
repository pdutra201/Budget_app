import { useState, useEffect } from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';
import Transactions from './Transactions';
import BudgetList from './BudgetList'
import Errors from './Errors';
import Login from './Login';




function App() {
  // Create State for each model request
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [budgets, setBudgets] = useState([])
  const [categories, setCategories] = useState([])
  const [trans, setTrans] = useState([])

  //clear error message from client
  const clearError = () => {
    setError(null)
  }

  const getCategories = () => {
    fetch("/api/categories")
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Failed to fecth categories')
      }
      return resp.json()
    })
    .then(data => {
      setCategories(data)
    })
  }

  // GET request transactions from db and set state
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

//GET request budget from db and set state
  const getBudgets = () => {
    fetch("/api/budget")
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Failed to fetch transactions')
        }
        return resp.json()
      })
      .then(data => {
        setBudgets(data)
    })
  }

  //check if user is logged in set error is not and clear error is successful
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
                <Route path="/transactions" element={<Transactions setUser={setUser} trans={trans} setTrans={setTrans} getTransactions={getTransactions} isLoggedIn={isLoggedIn} user={user}/>}/>
                <Route path="/budget" element={<BudgetList getBudgets={getBudgets} budgets={budgets} user={user} categories={categories} getCategories={getCategories}/>}/>
              </Routes>
            </div>
          </div>
            
        </Router>
  )
}

export default App

