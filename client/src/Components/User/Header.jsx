import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-300'>
        <div className='flex justify-between items-center max max-w-7xl mx-auto p-3'>
            <h1 className='font-bold'>User Management</h1>
            <ul className='flex gap-4'>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/signIn'}><li>SignIn</li></Link>
                <Link to={'/profile'}><li>Profile</li></Link>  
                
            </ul>
        </div>
    </div>
  )
}

export default Header