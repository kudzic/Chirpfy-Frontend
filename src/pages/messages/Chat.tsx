import React, { useEffect, useState, useRef } from 'react';
import { Stomp, CompatClient } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { useNavigate } from 'react-router-dom';
import './chat.css';


function Chat() {
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [messages, setMessages] = useState<{ senderId: string; content: string }[]>([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const chatAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem('email') || '';
  const fullname = `${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`;
  
  useEffect(() => {
    if (!nickname || !fullname) {
      navigate('/login');
      return;
    }

    if (!stompClient) {
      const socket = new SockJS('http://localhost:8089/ws');
      const client = Stomp.over(socket) as CompatClient;
      client.connect(
        {},
        () => {
          setStompClient(client);
          onConnected(client);
        },
        onError
      );
    }
  }, [stompClient, nickname, fullname, navigate]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const onConnected = (client: CompatClient) => {
    if (client) {
      client.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
      client.subscribe('/user/topic', onMessageReceived);
      client.send('/app/user.add', {}, JSON.stringify({ nickname, fullname, status: 'ONLINE' }));
      setConnected(true);
      fetchConnectedUsers();
    }
  };

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body);
    if (selectedUserId === message.senderId || selectedUserId === message.recipientId) {
      setMessages((prevMessages) => [...prevMessages, { senderId: message.senderId, content: message.content }]);
    }
    fetchConnectedUsers();
  };

  const onError = (error: string) => {
    console.error('Connection error:', error);
    setConnected(false);
  };

  const fetchConnectedUsers = async () => {
    try {
      const response = await fetch('http://localhost:8089/users');
      const data = await response.json();
      const filteredUsers = data.filter((user: any) => user.nickname !== nickname);
      setConnectedUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserChat = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8089/messages/${nickname}/${userId}`);
      console.log(response);
      console.log("User Id: ",userId);
      if (response.ok) {
        const chatHistory = await response.json();
        console.log("Chat history: ",chatHistory)
        setMessages(chatHistory.map((msg: any) => ({ senderId: msg.senderId, content: msg.content })));
      } else {
        console.error('Failed to fetch chat history:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);

    fetchUserChat(userId);
  };

  const sendMessage = () => {
    const messageContent = (document.querySelector('#messageForm') as HTMLInputElement)?.value.trim();
    if (messageContent && connected && stompClient && selectedUserId) {
      const chatMessage = {
        senderId: nickname,
        recipientID: selectedUserId,
        content: messageContent,
        timestamp: new Date(),
      };
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessages((prevMessages) => [...prevMessages, { senderId: nickname, content: messageContent }]);
      
    }
  };

  return (
    <div className="w-full h-screen ml-20 flex flex-row">
      <div className="w-6/12 min-h-full border-l-black-50 border-x-2 flex flex-col">
        <div>
          <p className="m-2 text-lg font-semibold">Messages</p>
        </div>
        <div className="w-full p-2 flex border-b-2">
          <ul>
            {connectedUsers.map((user: any) => (
              <li
                key={user.nickname}
                className={`user-item ${selectedUserId === user.nickname ? 'active' : ''}`}
                onClick={() => handleUserSelect(user.nickname)}
              >
                {user.fullname}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full flex flex-col">
          <div className="border-y-2 w-full h-16 border-gray mb-4">
            <p className="m-2">{selectedUserId || 'Select a user to chat'}</p>
            <p>{}</p>
          </div>
          <div className="chat-area" ref={chatAreaRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.senderId === nickname ? 'sender' : 'receiver'}`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
          <div className="mb-5 mt-auto w-full flex gap-6">
            <input
              type="text"
              placeholder="Write a message here"
              id="messageForm"
              className="ml-5 border-gray-500 border-2 w-11/12 rounded-xl h-10 p-2"
            />
            <button
              className="border border-black rounded-lg p-2 bg-blue-400"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
