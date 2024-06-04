import { Avatar, Stack, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ChatList = ({ friend }) => {
  const { user } = useSelector((state) => state.auth);

  console.log(friend);
  return (
    <Stack
      sx={{
        cursor: 'pointer',
      }}>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar src={friend.fndInfo.image} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            {friend.fndInfo.userName}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {friend.msgInfo && friend.msgInfo.senderId === user.id
              ? 'You'
              : friend.fndInfo.userName + ' '}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {friend.msgInfo && friend.msgInfo.message.text
              ? friend.msgInfo.message.text.slice(0, 10)
              : friend.msgInfo && friend.msgInfo.message.image
              ? 'Sent an image'
              : 'Connect with you'}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {friend.msgInfo
              ? moment(friend.msgInfo.createdAt).startOf('minute').fromNow()
              : moment(friend.fndInfo.createdAt).startOf('minute').fromNow()}
          </Typography>
        </Box>
        {user.id === friend.msgInfo?.senderId ? (
          <Avatar
            src={`./image/${friend.fndInfo.image}`}
            alt=''
            sx={{ width: 24, height: 24 }}
          />
        ) : (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'blue',
            }}></Box>
        )}
      </Stack>
    </Stack>
  );
};

export default ChatList;
