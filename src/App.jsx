import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Dashboard from './assets/pages/Dashboard'
import AiAssistance from './assets/pages/AiAssistance'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assistance" element={<AiAssistance />} />
      </Routes>
    </Router>
  )
}

export default App
