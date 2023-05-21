import React, { useEffect, useState } from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profil from "./pages/Profil"
import { AuthProvider } from "./contexts/AuthContext"

const Main = () => {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  )
}

export default Main

if (document.getElementById("app")) {
  const rootElement = document.getElementById("app")
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <AuthProvider>
        <Main/>
      </AuthProvider>
    </StrictMode>
  )
}