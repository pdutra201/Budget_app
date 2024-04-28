import React from 'react'
import { UserProvider } from '../context/UserContext';
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
  
  return (
        <Router >
          <UserProvider>
            <div style={{display: 'flex'}}>
              <div className='sidebar'>
                <NavBar />
              </div>
              <div className='main-content'>
                <Errors />
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/signup" element={<SignUp />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/transactions" element={<Transactions />}/>
                  <Route path="/budget" element={<BudgetList />}/>
                </Routes>
              </div>
            </div>
          </UserProvider>
        </Router>
  )
}

export default App

