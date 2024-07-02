import React from 'react'
import img from '../assets/img.png'
import '../styles/signup.css'
const Signup = () => {
  return (
    <div className='body'>
        <div className='signup-box'>
            <div className='leftcol'>
                <label className='signup-label'>Sign up</label>
                <hr className='signup-sep'></hr>
            </div>
            <div className='midcol'>
                <div className='mid-row1'>
                    <div className='line1'>
                        <input type='text' placeholder='username' className='username-in'></input>
                        <input type='tel' placeholder='phone number' className='phone-in'></input>
                    </div>
                    <div className='line2'>
                        <input type='email' placeholder='email' className='email-in'></input>
                        <input type="number" placeholder='age' className='age-in'></input>
                    </div>
                    <div className='line3'>
                        <input type='password' placeholder='password' className='password-in'></input>
                        <input type='password' placeholder='confirm password' className='confirm-in'></input>
                    </div>
                </div>
                <div className='mid-row2'>
                    <button className='signup-btn'>Sign up</button>
                </div>
            </div>
            <div className='rightcol'>
                <img src={img} className='img'></img>
            </div>
        </div>
    </div>
  )
}

export default Signup