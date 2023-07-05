import React from 'react'
import Navbar from '../components/Navbar'

const ErrorScreen = () => {
  return (
    <>
    <Navbar/>
    <div style={{margin: "2rem", fontFamily: "Rubik"}}>
        <h1 style={{fontFamily: "Geologica"}}>Not Found</h1>
        <p>This address has not been found, try again :(</p>
    </div>
    </>
  )
}

export default ErrorScreen