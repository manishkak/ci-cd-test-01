import React, { useState, useEffect } from 'react'

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api?action=user-info')
        const data = await response.json()
        
        if (response.ok) {
          setUserInfo(data)
        } else {
          setMessage(`Error: ${data.error}`)
        }
      } catch (error) {
        setMessage('Error fetching user information')
      }
    }
    
    fetchUserInfo()
  }, [])

  return (
    <div className="user-info-container">
      <h2>Your Profile</h2>
      {userInfo ? (
        <div className="user-details">
          <p><strong>User ID:</strong> {userInfo.user_id}</p>
          <p><strong>Full Name:</strong> {userInfo.full_name}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>{message || 'Loading...'}</p>
      )}
    </div>
  )
}

export default UserInfo
