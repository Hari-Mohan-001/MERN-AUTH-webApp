import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-4 max-w-lg mx-auto'>
        <h1 className='text-center my-8 text-3xl font-bold'>Profile</h1>
        <form className='flex flex-col gap-3'>
            <img className='h-28 w-28 rounded-full object-cover self-center' src={currentUser.profileImage} alt="" />

            <input
            type="text"
            placeholder="Username"
            id="userName"
            defaultValue={currentUser.userName}
            className="bg-slate-100 p-3 rounded-lg" 
          />
            <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="bg-slate-100 p-3 rounded-lg" 
          />
            <input
            type="password"
            placeholder="Password"
            id="password"

            className="bg-slate-100 p-3 rounded-lg" 
          />
            <button className='bg-slate-950 text-white rounded-lg p-3 uppercase mt-2 hover:opacity-90'>update</button> 
        </form>
        <div className='flex justify-between mt-4'>
            <span className='text-red-600 cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer text-blue-600'>Sign Out</span>
        </div>

    </div>
  )
}

export default Profile