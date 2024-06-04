import { Box, Avatar, Typography, Chip } from '@mui/material';
import '../../../assets/css/MessageSend.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const socket = io('http://localhost:7000');
  const scrollRef = useRef();

  const [typingMsg, setTypingMsg] = useState('');

  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { currentFriend } = useSelector((state) => state.chat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.emit('join', user.id);
    socket.on('receiveTypingMsg', (msg) => {
      setTypingMsg(msg);
    });
    return () => {
      socket.off('receiveTypingMsg');
    };
  }, [user.id]);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Sent Message */}

      {messages && messages.length > 0 ? (
        messages.map((m) =>
          m.senderId === user.id ? (
            <Box
              ref={scrollRef}
              key={m._id}
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                mb: 2,
              }}>
              <Box
                sx={{
                  maxWidth: '60%',
                  bgcolor: '#E1FFC7',
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}>
                {m.message.text === '' ? (
                  <img
                    src={`http://localhost:5000/${m.message.image}`}
                    style={{ maxWidth: '250px', maxHeight: '250px' }}
                  />
                ) : (
                  <Typography variant='body2'>{m.message.text}</Typography>
                )}

                <Typography variant='body2' color='textSecondary'>
                  You, {new Date(m.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
              <Avatar
                src={`http://localhost:5000/${user.image}`}
                sx={{ ml: 2, alignSelf: 'flex-start' }}
              />
            </Box>
          ) : (
            <Box
              ref={scrollRef}
              key={m._id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                mb: 2,
              }}>
              <Avatar
                alt={`http://localhost:5000/${currentFriend.userName}`}
                src={`http://localhost:5000/${currentFriend.image}`}
                sx={{ mr: 2, alignSelf: 'flex-start' }}
              />
              <Box
                sx={{
                  maxWidth: '60%',
                  bgcolor: '#F1F1F1',
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                {m.message.text === '' ? (
                  <img
                    src={`http://localhost:5000/${m.message.image}`}
                    style={{ maxWidth: '250px', maxHeight: '250px' }}
                  />
                ) : (
                  <Typography variant='body2'>{m.message.text}</Typography>
                )}
                <Typography variant='body2' color='textSecondary'>
                  {currentFriend.userName},{' '}
                  {new Date(m.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          )
        )
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No messages yet.
        </Typography>
      )}

      {typingMsg &&
      typingMsg.msg &&
      typingMsg.senderId === currentFriend._id ? (
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            mb: 2,
          }}>
          <Avatar
            alt={`http://localhost:5000/${currentFriend.userName}`}
            src={`http://localhost:5000/${currentFriend.image}`}
            sx={{ mr: 2, alignSelf: 'flex-start' }}
          />
          <Chip label='Typing...' />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Chat;
