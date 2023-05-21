import React, { useContext, useEffect, useState } from 'react'

const AuthContext = React.createContext()

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("auth")
    if (loggedInUser) {
      setIsLoggedIn(true)
      setAuthUser(JSON.parse(loggedInUser))
    }
    else {
      setIsLoggedIn(false)
      setAuthUser(null)
    }
  }, [])

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, useAuth, AuthProvider }