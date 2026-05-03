import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import Insights from '../components/Insights'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <Insights/>
      <Footer/>
    </>
  )
}

export default Home
