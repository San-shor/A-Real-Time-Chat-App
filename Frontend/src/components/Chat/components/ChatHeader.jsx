import { Avatar, Stack, Typography } from '@mui/material';
import {
  IoCallOutline,
  IoVideocamOutline,
  IoChatbubblesOutline,
} from 'react-icons/io5';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const { currentFriend } = useSelector((state) => state.chat);

  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-evenly'}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <Avatar src={currentFriend.image} />
        <Stack spacing={2}>
          <Typography variant='h5'>{currentFriend.userName}</Typography>
          <Typography variant='body2'>online</Typography>
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
