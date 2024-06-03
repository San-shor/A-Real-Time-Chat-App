import { Avatar, Stack, Typography, Chip } from '@mui/material';
import {
  IoCallOutline,
  IoVideocamOutline,
  IoChatbubblesOutline,
} from 'react-icons/io5';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const { currentFriend, activeUser } = useSelector((state) => state.chat);

  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-evenly'}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <Avatar src={`http://localhost:5000/${currentFriend.image}`} />
        <Stack spacing={2}>
          <Typography variant='h5'>{currentFriend.userName}</Typography>
          {activeUser &&
          activeUser.length > 0 &&
          activeUser.some((user) => user.userId === currentFriend._id) ? (
            <Chip
              label='Active Now'
              variant='outlined'
              color='success'
              size='small'
            />
          ) : (
            ''
          )}
        </Stack>
      </Stack>
      <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
        <IoCallOutline />
        <IoVideocamOutline />
        <IoChatbubblesOutline />
      </Stack>
    </Stack>
  );
};

export default ChatHeader;
