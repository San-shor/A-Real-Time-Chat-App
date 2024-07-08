import { Container, Grid, Box } from '@mui/material';
import UserProfile from './components/UserProfile';
import ChatHeader from './components/ChatHeader';
import Chat from './components/Chat';
import MessageSend from './components/MessageSend';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSound from 'use-sound';
import notification from '../../assets/audio/notification.mp3';

const ChatView = () => {
  const { messages, currentFriend } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.auth);

  const [notificationSound] = useSound(notification);

  useEffect(() => {
    messages.map((m) => {
      if (m && m.senderId !== currentFriend._id && m.receiverId === user.id) {
        notificationSound();
        toast.success(`${m.senderName} Send a New Message`);
      }
    });
  }, [messages]);

  return (
    <Container>
      <Toaster
        position={'top-right'}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '18px',
          },
        }}
      />
      <Grid container spacing={10}>
        <Grid item md={4}>
          <UserProfile />
        </Grid>
        <Grid item md={8}>
          <Box sx={{ width: '50vw' }}>
            <ChatHeader />

            <Chat />

            <MessageSend />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatView;
