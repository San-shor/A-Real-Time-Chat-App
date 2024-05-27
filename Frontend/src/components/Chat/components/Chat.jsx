import { Box, Avatar, Typography } from '@mui/material';
import '../../../assets/css/MessageSend.css';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const Chat = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { currentFriend } = useSelector((state) => state.chat);
  console.log(messages);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Sent Message */}

      {messages && messages.length > 0 ? (
        messages.map((m) =>
          m.senderId === user.userInfo.id ? (
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
                src={`http://localhost:5000/${user.userInfo.image}`}
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
                alt={currentFriend.userName}
                src={currentFriend.image}
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
                <Typography variant='body2'>{m.message.text}</Typography>
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

      {/* Received Message */}
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          mb: 2,
        }}>
        <Avatar
          alt='James Johnson'
          src='https://modernize-nextjs.adminmart.com/images/profile/user-10.jpg'
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
          }}>
          <Typography variant='body2'>hello</Typography>
          <Typography variant='body2' color='textSecondary'>
            James Johnson, 8 hours ago
          </Typography>
        </Box>
      </Box> */}

      {/* Another Received Message */}
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          mb: 2,
        }}>
        <Box
          sx={{
            maxWidth: '60%',
            bgcolor: '#F1F1F1',
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='body2'>Zo doj kumahha ri zedpurmos.</Typography>
          <Typography variant='body2' color='textSecondary'>
            7 hours ago
          </Typography>
        </Box>
      </Box> */}

      {/* Sent Image Message */}
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          mb: 2,
        }}>
        <Box
          sx={{
            maxWidth: '60%',
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <img
            alt='attach'
            src='/images/blog/blog-img1.jpg'
            width='250'
            height='165'
            style={{ borderRadius: '8px' }}
          />
        </Box>
      </Box> */}
    </Box>
  );
};

export default Chat;
