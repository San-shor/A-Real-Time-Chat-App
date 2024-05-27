import { Avatar, Stack, Typography } from '@mui/material';

const ChatList = ({ friend }) => {
  return (
    <Stack spacing={2} sx={{ cursor: 'pointer' }}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <Avatar src={friend.image} />
        <Typography variant='subtitle2'>{friend.userName}</Typography>
      </Stack>
    </Stack>
  );
};

export default ChatList;
