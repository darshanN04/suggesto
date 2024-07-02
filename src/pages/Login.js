import React from 'react'
import '../styles/login.css'
const Login = () => {
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
                <button className='submit_button'>Submit</button>
                <button className='cancel_button'>Cancel</button>
            </div>
       </div>

    </div>
  )
}

export default Login