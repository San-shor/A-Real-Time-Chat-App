import { Avatar, Stack, Typography } from '@mui/material';
import {
  IoCallOutline,
  IoVideocamOutline,
  IoChatbubblesOutline,
} from 'react-icons/io5';
const ChatHeader = () => {
  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-evenly'}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-2.jpg' />
        <Stack spacing={2}>
          <Typography variant='h5'>Sanjida Akter</Typography>
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
