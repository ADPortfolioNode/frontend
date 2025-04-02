import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setResponse, setError } from '../store/endpointsSlice';

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socketInstance = io('http://localhost:5000', {
      path: '/socket.io',  // Ensure this matches the server configuration
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 60000,
      autoConnect: true,
      forceNew: true,
      namespace: '/ws'  // Ensure this matches the server namespace
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('response', (data) => {
      console.log('Received response:', data);
      dispatch(setResponse(data));
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection Error:', error);
      dispatch(setError({ 
        message: `WebSocket connection error: ${error.message}`,
        savedpath: ''
      }));
    });

    socketInstance.on('error', (error) => {
      console.error('Socket Error:', error);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [dispatch]);

  return socket;
};

export default useSocket;
