import { Avatar, Stack, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaCircleCheck } from 'react-icons/fa6';

const ChatList = ({ friend }) => {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (date) => {
    const now = moment();
    const diff = now.diff(moment(date), 'days');

    if (diff === 0) {
      return moment(date).format('h:mm A');
    } else if (diff === 1) {
      return 'Yesterday';
    } else {
      return moment(date).format('D/MM/YYYY');
    }
  };

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
        </Box>
        {user.id === friend.msgInfo?.senderId ? (
          friend.msgInfo.status === 'seen' ? (
            <Avatar
              src={`./image/${friend.fndInfo.image}`}
              alt=''
              sx={{ width: 24, height: 24 }}
            />
          ) : friend.msgInfo.status === 'delivered' ? (
            <FaCircleCheck />
          ) : (
            <Box
              sx={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'blue',
              }}></Box>
          )
        ) : (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'blue',
            }}></Box>
        )}
        <Typography variant='caption' color='textSecondary'>
          {friend.msgInfo
            ? formatDate(friend.msgInfo.createdAt)
            : formatDate(friend.fndInfo.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatList;
