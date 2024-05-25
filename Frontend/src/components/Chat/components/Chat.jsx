import { Box, Avatar, Typography } from '@mui/material';
import '../../../assets/css/MessageSend.css';

const Chat = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Sent Message */}
      <Box
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
          <Typography variant='body2'>Hii.</Typography>
          <Typography variant='body2' color='textSecondary'>
            You, 8 hours ago
          </Typography>
        </Box>
        <Avatar
          alt='You'
          src='/images/your-avatar.jpg'
          sx={{ ml: 2, alignSelf: 'flex-start' }}
        />
      </Box>

      {/* Received Message */}
      <Box
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
      </Box>

      {/* Another Received Message */}
      <Box
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
      </Box>

      {/* Sent Image Message */}
      <Box
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
      </Box>

      {/* Sent Message */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
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
          <Typography variant='body2'>Re ohodaja fakit zowahog wul.</Typography>
          <Typography variant='body2' color='textSecondary'>
            You, 7 hours ago
          </Typography>
        </Box>
        <Avatar
          alt='You'
          src='/images/your-avatar.jpg'
          sx={{ ml: 2, alignSelf: 'flex-start' }}
        />
      </Box>
    </Box>
  );
};

export default Chat;
