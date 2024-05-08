import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Header = () => {
  const {currentUser} = useSelector((state)=> state.user)
  console.log(currentUser);
  return (
    <div className='bg-slate-300'>
        <div className='flex justify-between items-center max max-w-7xl mx-auto p-3'>
            <h1 className='font-bold'>User Management</h1>
            <ul className='flex gap-4'>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/profile'}>
                  {currentUser ? (
                    <img className='w-7 h-7 rounded-full object-cover' src={currentUser.profileImage} alt="image" />
                  ):
                  (<li>SignIn</li>
                     )} 
                  </Link>
                  
                
            </ul>
        </div>
    </div>
  )
}

export default Header