import React from 'react';
// import { Link }  from 'react-router-dom';

function Chat({ name, message, profilePic, timestamp, id, conID }) {
    return (
    <a href={`/chatScreen/${conID}/${id}`}>
      <div className="chat">
        <img src={`${profilePic}`} className="rounded-circle chat-image mr-3" alt="KB" />
          <div className="chat-details pt-3">
            <div>{name}</div>
            <p>{message}</p>
          </div>
            <p className="chat-timestamp pt-3">{timestamp}</p>
      </div>
    </a>
    );
}

export default Chat;
