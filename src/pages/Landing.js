import React from 'react'
import '../styles/landing.css'
const Landing = () => {
  return (
    <div className='landing'>
        <h1 className='main_heading'>Welcome to suggesto</h1>
        <p className='para'>Here you can suggest your ideas and vote for the best ones!</p>
        <div className='buttons_landing'>
            <button className='login_button'>Login</button>
            <button className='signup_button'>Sign Up</button>
        </div>
    </div>
  )
}

export default Landing