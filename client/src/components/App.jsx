import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import '/App.css'
import NavBar from './NavBar'
import Home from './Home'
import SignUp from './Signup';
import '/home/pdutra/Development/code/phase-4/budget_app/client/node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.css'


function App() {
  const [user, setUser] = useState(null)

  return (
    <body>

    
        <Router class="container">
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<SignUp setUser={setUser}/>}/>
          </Routes>
          
        </Router>
    </body>
       
    
  )
}

export default App

