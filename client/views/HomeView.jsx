import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const HomeView = () => {
  return (
    <>
    <Navbar/>
    <div>HomeView</div>
    <Link to="/makeorder">Build a new Order</Link>
    </>
  )
}

export default HomeView