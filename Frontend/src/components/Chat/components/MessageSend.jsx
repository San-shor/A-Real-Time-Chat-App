import { TextField, IconButton } from '@mui/material';
import { BsSend, BsEmojiSmile } from 'react-icons/bs';
import { FcStackOfPhotos } from 'react-icons/fc';

const MessageSend = () => {
  return (
    <form style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <TextField
        id='msg-sent'
        placeholder='Type a Message'
        aria-label='Type a Message'
        fullWidth
        size='small'
        variant='standard'
        InputProps={{
          startAdornment: (
            <IconButton aria-label='send'>
              <BsEmojiSmile />
            </IconButton>
          ),
          endAdornment: (
            <>
              <IconButton aria-label='send'>
                <BsSend />
              </IconButton>
              <IconButton aria-label='photo'>
                <FcStackOfPhotos />
              </IconButton>
            </>
          ),
        }}
      />
    </form>
  );
};

export default MessageSend;
