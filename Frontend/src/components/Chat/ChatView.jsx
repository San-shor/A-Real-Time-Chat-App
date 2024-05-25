import { Container, Grid, Paper } from '@mui/material';
import UserProfile from './components/UserProfile';
import ChatHeader from './components/ChatHeader';
import Chat from './components/Chat';
import MessageSend from './components/MessageSend';

const ChatView = () => {
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item sm={6}>
          <UserProfile />
        </Grid>

        <Grid item sm={6}>
          <Paper
            elevation={1}
            sx={{ padding: 4, width: '50vw', height: '90vh' }}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <ChatHeader />
              </Grid>

              <Grid item>
                <Chat />
              </Grid>

              <Grid item>
                <MessageSend />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatView;
