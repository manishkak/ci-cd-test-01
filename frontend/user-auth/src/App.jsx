import React, { useState } from 'react'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import UserInfo from './pages/UserInfo'

function App() {
  const [page, setPage] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setPage('userinfo')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPage('login')
  }

  return (
    <div className="app">
      <header>
        <h1>User Authentication System</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </header>
      <main>
        {!isLoggedIn ? (
          <>
            {page === 'login' && (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <p>New user? <button onClick={() => setPage('register')} className="link-btn">Register here</button></p>
              </>
            )}
            {page === 'register' && (
              <>
                <Register onRegisterSuccess={() => setPage('login')} />
                <p>Already have an account? <button onClick={() => setPage('login')} className="link-btn">Login here</button></p>
              </>
            )}
          </>
        ) : (
          <UserInfo />
        )}
      </main>
    </div>
  )
}

export default App
