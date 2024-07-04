import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import { FcLike } from "react-icons/fc";

const Main = () => {
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState('');
  const [like, setLike] = useState(156);
  var [isLike, setIsLike] = useState(false);
 
  const likeButton = () => {
    setLike (like + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };
  const handleSend = () => {
    if (comment.trim()) {
      setMessages([...messages, comment]);
      setLastMessage(comment); // Update lastMessage with the current comment
      setComment(''); // Clear the textarea after sending
    }
  };


  return (
    <div className='main'>
        <div className='nav_bar'>
          <select className='nav_input1'>
              <option>Food</option>
              <option>Place</option>
              <option>HomeStay</option>
              <option>College</option>
            </select>
            <select className='nav_input2'>
              <option>Manipal</option>
              <option>Udupi</option>
              <option>Parkala</option>
            </select>
            <button className='search_btn'>Search</button>
        </div>


        
      <div className='mid'>
        {messages.map((message, index) => (
          <div key={index} className='message_card'>
            <div className='upper_part'>{message}</div>
            <div className='lower_part'>
              <p className={'' + (isLike? "try": "try1")}>
                
                <i class="fa fa-thumbs-up" style={{fontSize: "20px"}} onClick={likeButton}></i>
                <br />
                
              </p>
              <p className='like_label'>{like}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bottom_bar'>
        <select className='nav_input1'>
          <option>Food</option>
          <option>Place</option>
          <option>HomeStay</option>
          <option>College</option>
        </select>
        <select className='nav_input1'>
          <option>Manipal</option>
          <option>Udupi</option>
          <option>Parkala</option>
        </select>
        <textarea className='comment_box' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button className='search_btn' onClick={handleSend}>Send</button>
        
      </div>

    </div>
  );
}

export default Main;