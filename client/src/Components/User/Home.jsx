import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const {currentUser} = useSelector((state)=> state.user)
    const navigate = useNavigate()
    if(!currentUser){
     navigate("/signIn")
    }
  return (
    <div>
        <h1 className='text-center font-bold mt-10 text-4xl'>Welcome to the Home page </h1>
        <h2 className='text-center text-3xl text-purple-700 p-4'>welcome!!! {currentUser.userName}</h2>
        <div className='mt-3 flex max-w-lg mx-auto'>
            <p className='text-center'> This is your home page, you are now able to navigate to your profile by clicking the avatar on the top right side
                and further you are able to update your profile in the profile page.
            </p>
        </div>
    </div>
  )
}

export default Home