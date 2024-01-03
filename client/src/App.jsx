import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import '/App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';


function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp setUser={setUser}/>}/>
      </Routes>
      
    </Router>
  )
}

export default App

