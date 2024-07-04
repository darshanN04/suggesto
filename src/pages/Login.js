import React from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='body'>
       <div className="login_box">
            <div className='login_label'>Login</div>
            <hr className='login_label_sep'></hr>
            <div className='inputs'>
                <input type='text' class="user_input1" placeholder='Username'/>
                <input type='password' class="user_input2" placeholder='Password'/>
            </div>
            <div className='f_p'>
                <label className='forgot_password'>forgot password?</label>
            </div>
            <div className='buttons'>
                <button className='submit_button' onClick={()=>navigate('/main')}>Submit</button>
                <button className='cancel_button' onClick={()=>navigate(-1)}>Cancel</button>
            </div>
       </div>

    </div>
  )
}

export default Login