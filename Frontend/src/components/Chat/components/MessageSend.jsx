import { TextField, IconButton, Popover, Box } from '@mui/material';
import { BsSend, BsEmojiSmile } from 'react-icons/bs';
import { FcStackOfPhotos } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { messageSend, fetchMessages } from '../../../store/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

const MessageSend = () => {
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');

  const { user } = useSelector((state) => state.auth);

  const { currentFriend } = useSelector((state) => state.chat);
  const [anchorEl, setAnchorEl] = useState(null);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: user.userInfo.username,
      receiverId: currentFriend._id,
      message: newMessage,
    };
    dispatch(messageSend(data));
    setNewMessage('');
  };

  const handleEmojiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const sentEmonji = (emoji) => {
    console.log(emoji.emoji);
    setNewMessage(newMessage + emoji.emoji);
  };

  useEffect(() => {
    dispatch(fetchMessages(currentFriend._id));
  }, [currentFriend._id]);

  return (
    <form style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <TextField
        id='msg-sent'
        placeholder='Type a Message'
        aria-label='Type a Message'
        fullWidth
        size='small'
        variant='standard'
        onChange={inputHandle}
        value={newMessage}
        InputProps={{
          startAdornment: (
            <IconButton aria-label='send' onClick={handleEmojiOpen}>
              <BsEmojiSmile />
            </IconButton>
          ),
          endAdornment: (
            <>
              <IconButton aria-label='send' onClick={sendMessage}>
                <BsSend />
              </IconButton>
              <IconButton aria-label='photo'>
                <FcStackOfPhotos />
              </IconButton>
            </>
          ),
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Box>
          <EmojiPicker onEmojiClick={sentEmonji} />
        </Box>
      </Popover>
    </form>
  );
};

export default MessageSend;
