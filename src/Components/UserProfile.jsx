import React from 'react'
import { useAuth } from '../hooks/useAuth'

export const UserProfile = () => {
    const {user}=useAuth()
    console.log(user.displayName)
  return (
    <div data-aos="zoom-in-up" className="bg-white rounded-lg m-8 shadow-md p-6 place-content-center flex items-center mb-8">
    <img
      className="w-12 h-12 rounded-full object-cover mr-4"
      src={user?.photoURL || "/public/placeholder.jpg"}
      alt={`Profile picture of ${''}`}
    />
    <div>
      <h2 className="text-xl font-semibold">{user.displayName}</h2>
      
      {/* You can add more details like role, bio, etc. */}
    </div>
  </div>
  )
}
