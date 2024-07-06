import React, { useState } from 'react';
import '../styles/main.css';
const Main = () => {
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const x= 1200;
  const handleSend = () => {
  if (comment.trim()) {
      setMessages([...messages, { text: comment, like: x, isLiked: false , isDisLiked: false}]);
      setComment(''); // Clear the textarea after sending
    }
  };

  const togglebutton1 = (index) =>{
    setMessages(messages.map((message, i) =>
      i === index ? {
        ...message,
        like: message.isLiked ? message.like - 1 : (message.isDisLiked ? message.like + 2 : message.like + 1),
        isLiked: !message.isLiked,
        isDisLiked: message.isLiked ? message.isDisLiked : false
      } : message
    ));
  }
  
  const togglebutton2 = (index) => {
    setMessages(messages.map((message, i) => 
      i === index ? { 
        ...message, 
        like: message.isDisLiked ? message.like + 1 : (message.isLiked ? message.like - 2: message.like - 1), 
        isDisLiked: !message.isDisLiked,
        isLiked: message.isDisLiked ? message.isLiked : false 
      } : message
    ));
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
            <div className='upper_part'>{message.text}</div>
            <div className='lower_part'>
              <p className={(message.isLiked? "liked": "disliked")}>
                <i class="fa fa-thumbs-up" style={{fontSize: "20px"}} onClick={()=>togglebutton1(index)}></i>
              </p>
              <p className='like_label'>{message.like}</p>
              <p className={(message.isDisLiked? "liked": "disliked")}>
                <i class="fa fa-thumbs-down" style={{fontSize: "20px"}} onClick={()=>togglebutton2(index)}></i>
              </p>
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
        <textarea className='comment_box' value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault();handleSend();}}}>
        </textarea>
        <button className='search_btn' onClick={handleSend}>Send</button>
      </div>

    </div>
  );
}

export default Main;