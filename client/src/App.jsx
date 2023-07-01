import { useState } from 'react'
import Navbar from '../components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <p>Hello World</p>
    </>
  )
}

export default App
