import ChatHeader from './components/ChatHeader';
import Chat from './components/Chat';
import MessageSend from './components/MessageSend';
import { Box } from '@mui/material';

const ChatContainer = () => {
  return (
    <Box>
      <ChatHeader />

      <Chat />

      <MessageSend />
    </Box>
  );
};

export default ChatContainer;
