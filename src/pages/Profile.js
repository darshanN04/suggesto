import React, { useState, useContext, useEffect } from 'react'
import '../styles/profile.css'
import { UserContext } from '../pages/UserContext';

const Profile = () => {

  const { userId } = useContext(UserContext);  // Access user_id from context
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    email: '',
    phone_no: '',
    total: 0,
  });


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getUserInfo?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    try{
    const response = await fetch('http://localhost:5000/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId, 
        oldpassword: oldPassword,
        newpassword: newPassword,
      }),
    });
    

    const result = await response.json();
    if (response.status === 200) {
      alert(result.message);
    } else {
      alert(result.message);
    }}
    catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className='profile_page'>
        <div className='upper_profile'>
            <div className='col1'>
                <h1 className='profile_name'>{userInfo.user_name}</h1>
                <p className='profile_email'>{userInfo.email}</p>
                <p className='profile_comments'>{userInfo.phone_no}</p>
            </div>
            <div className='col2'>
                <div className='boxx'>                
                  <div className='comments_count'>No. of comments</div>
                </div>
                <p className='counts'>{userInfo.total}</p>
            </div>
            <div className='col3'>
                <div className='row'>Update Password</div>
                  <input className='row1' type='password'
                    placeholder='Old password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}>
                  </input>
                  <input className='row2' type='password'
                    placeholder='New password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}>
                  </input>
                  <input className='row3' type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                  </input>
                <button className='update_button' onClick={handleUpdatePassword}>Update</button>
            </div>
        </div>
        <div className='lower_profile'>

        </div>
    </div>
  )
}

export default Profile