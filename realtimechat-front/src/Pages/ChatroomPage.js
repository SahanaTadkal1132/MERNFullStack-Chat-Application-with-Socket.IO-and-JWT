import React from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import "../styles/chatroom.css"

const ChatroomPage = ({ socket }) => {
  const { id: chatroomId } = useParams();
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState('');

  const sendMessage = () => {
    if (socket) {
      socket.emit('chatroomMessage', {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = '';
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('CC_Token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatroomId,
      });
    }

    return () => {
      // Component Unmount
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, [chatroomId, socket]);

  
  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};







export default ChatroomPage;
