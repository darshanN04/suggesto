import React, { useState } from 'react';
import '../styles/main.css';

const Main = () => {
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [typeId, setTypeId] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      setMessages([...messages, { text: comment, like: 1200, dislike: 200, isLiked: false, isDisLiked: false }]);
      setComment('');
    }
  };

  const togglebutton1 = (index) => {
    setMessages(messages.map((message, i) =>
      i === index ? {
        ...message,
        like: !message.isLiked ? message.like + 1 : message.like - 1,
        dislike: message.isDisLiked ? message.dislike - 1 : message.dislike,
        isLiked: !message.isLiked,
        isDisLiked: message.isDisLiked && !message.isLiked ? false : message.isDisLiked
      } : message
    ));
  };

  const togglebutton2 = (index) => {
    setMessages(messages.map((message, i) =>
      i === index ? {
        ...message,
        dislike: !message.isDisLiked ? message.dislike + 1 : message.dislike - 1,
        like: message.isLiked ? message.like - 1 : message.like,
        isDisLiked: !message.isDisLiked,
        isLiked: message.isLiked && !message.isDisLiked ? false : message.isLiked
      } : message
    ));
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
              <p className={(message.isLiked ? "liked" : "disliked")}>
                <i className="fa fa-thumbs-up" style={{ fontSize: "20px" }} onClick={() => togglebutton1(index)}></i>
              </p>
              <p className='like_label'>{message.likes_count}</p>
              <p className={(message.isDisLiked ? "liked" : "disliked")}>
                <i className="fa fa-thumbs-down" style={{ fontSize: "20px" }} onClick={() => togglebutton2(index)}></i>
              </p>
              <p className='like_label'>{message.dislikes_count}</p>
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
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}>
        </textarea>
        <button className='search_btn' onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Main;
