import React, { useState } from 'react'
import img from '../assets/img.png'
import '../styles/signup.css'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const validateForm = () => {
        if (!username || !phone || !email || !age || !password || !confirm) {
            alert("All fields are required.");
            return false;
        }
        if (password !== confirm) {
            alert("Passwords do not match.");
            return false;
        }
    
        return true;
    };
    const handleSignup = () => {
        if (validateForm()) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            navigate('/login'); 
        }
    };

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
                            <input type='text' placeholder='username' className='username-in' value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
                            <input type='tel' placeholder='phone number' className='phone-in' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
                        </div>
                        <div className='line2'>
                            <input type='email' placeholder='email' className='email-in' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                            <input type="number" placeholder='age' className='age-in' value={age} onChange={(e)=>setAge(e.target.value)}></input>
                        </div>
                        <div className='line3'>
                            <input type='password' placeholder='password' className='password-in' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                            <input type='password' placeholder='confirm password' className='confirm-in' value={confirm} onChange={(e)=> setConfirm(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='mid-row2'>
                        <button className='signup-btn' onClick={handleSignup}>Submit</button>
                    </div>
                </div>
                <div className='rightcol'>
                    <img src={img} alt="hi" className='img'></img>
                </div>
            </div>
        </div>
    )
}
export default Signup