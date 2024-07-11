import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginname, setLoginname] = useState('');
  const [loginpassword, setLoginpassword] = useState('');

  const checkCredentials = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginname,
          password: loginpassword,
        }),
      });

      if (response.status === 200) {
        navigate('/main');
      } else if (response.status === 401) {
        alert('Invalid username or password');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='body'>
      <div className="login_box">
        <div className='login_label'>Login</div>
        <hr className='login_label_sep'></hr>
        <div className='inputs'>
          <input type='text' className="user_input1" placeholder='Username' value={loginname} onChange={(e) => setLoginname(e.target.value)} />
          <input type='password' className="user_input2" placeholder='Password' value={loginpassword} onChange={(e) => setLoginpassword(e.target.value)} />
        </div>
        <div className='f_p'>
          <label className='forgot_password'>forgot password?</label>
        </div>
        <div className='buttons'>
          <button className='submit_button' onClick={checkCredentials}>Submit</button>
          <button className='cancel_button' onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
