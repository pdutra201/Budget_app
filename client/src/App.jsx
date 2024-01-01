import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>Profile Login</h1>
      <form>
        <label>New user?</label>
        <button>click here</button>
        <br></br>
        <label>Username </label>
        <input type='text'></input>
        <br></br>
        <label>Password </label>
        <input type='text'></input>
        <br></br>
        <button>Login</button>
      </form>
    </>
  )
}

export default App
