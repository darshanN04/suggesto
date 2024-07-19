import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import '../styles/main.css';

const Main = () => {
  const { userId } = useContext(UserContext);  // Access user_id from context
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [typeId, setTypeId] = useState('');

  const handleSend = async () => {
    if (comment.trim()) {
      try {
        const response = await fetch('http://localhost:5000/addMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId, 
            place_id: placeId,
            types_id: typeId,
            msg_content: comment,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setMessages([...messages, { msg_id: data.msg_id, msg_content: comment, likes_count: 0, dislikes_count: 0, isLiked: false, isDisLiked: false }]);
          setComment('');
        } else {
          console.error('Failed to add message');
        }
      } catch (error) {
        console.error('Error adding message:', error);
      }
    }
  };
  

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/getMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_id: placeId,
          types_id: typeId,
        }),
      });

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLike = async (msg_id, userId) => {
    try {
      const response = await fetch('http://localhost:5000/likeMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          msg_id: msg_id,
        }),
      });
  
      if (response.ok) {
        
        const data = await response.json();
        setMessages(messages.map(message => 
          message.msg_id === msg_id ? { ...message, likes_count: data.LIKE_COUNT, isLiked: data.LIKE_ID !== 0 } : message
        ));
      } else {
        console.error('Failed to toggle like');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const handleDislike = async (msg_id, userId) => {
    try {
      const response1 = await fetch('http://localhost:5000/dislikeMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          msg_id: msg_id,
        }),
      });
  
      if (response1.ok) {
        const data1 = await response1.json();
        setMessages(messages.map(message => 
          message.msg_id === msg_id ? { ...message, dislikes_count: data1.DISLIKE_COUNT, disLiked: data1.DISLIKE_ID !== 0 } : message
        ));
      } else {
        console.error('Failed to toggle like');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  return (
    <div className='main'>
      <div className='nav_bar'>
        <select className='nav_input1' onChange={(e) => setTypeId(e.target.value)}>
          <option value="">Select Type</option>
          <option value="1">Food</option>
          <option value="2">Place</option>
          <option value="3">HomeStay</option>
          <option value="4">College</option>
        </select>
        <select className='nav_input2' onChange={(e) => setPlaceId(e.target.value)}>
          <option value="">Select Place</option>
          <option value="1">Manipal</option>
          <option value="2">Udupi</option>
          <option value="3">Parkala</option>
        </select>
        <button className='search_btn' onClick={handleSearch}>Search</button>
      </div>

      <div className='mid'>
        {messages.map((message, index) => (
          <div key={index} className='message_card'>
            <div className='upper_part'>{message.msg_content}</div>
            <div className='lower_part'>
              <p className={message.isLiked ? "liked" : "disliked"} onClick={() => handleLike(message.msg_id, userId)}>
                <i className="fa fa-thumbs-up" style={{ fontSize: "20px" }}></i>
              </p>
              <p className='like_label'>{message.likes_count}</p>
              <p className={message.disLiked ? "liked" : "disliked"}  onClick={() => handleDislike(message.msg_id, userId)}>
                <i className="fa fa-thumbs-down" style={{ fontSize: "20px" }}></i>
              </p>
              <p className='like_label'>{message.dislikes_count}</p>
            </div>
          </div>
        ))}
      </div>



      <div className='bottom_bar'>
        <textarea className='comment_box' placeholder="Enter your comments" value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}>
        </textarea>
        <button className='search_btn' onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Main;
