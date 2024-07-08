import { TextField, IconButton, Popover, Box, Avatar } from '@mui/material';
import { BsSend, BsEmojiSmile, BsXCircle } from 'react-icons/bs';
import { FcStackOfPhotos } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import {
  messageSend,
  fetchMessages,
  imageMessageSend,
  messageSeen,
  messageDelivered,
} from '../../../store/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import {
  addMessages,
  updateLastMessage,
} from '../../../store/reducers/chatReducer';

const MessageSend = () => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:7000');

  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [socketMessage, setSocketMessage] = useState('');

  const { user } = useSelector((state) => state.auth);

  const { currentFriend, messageSendSuccess, messages } = useSelector(
    (state) => state.chat
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing-msg', {
      senderId: user.id,
      receiverId: currentFriend._id,
      msg: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('senderName', user.username);
      formData.append('receiverId', currentFriend._id);
      formData.append('image', selectedImage);

      dispatch(imageMessageSend(formData));
      setSelectedImage(null);
    } else {
      const data = {
        senderId: user.id,
        senderName: user.username,
        receiverId: currentFriend._id,
        message: newMessage,
      };

      dispatch(messageSend(data));
    }

    socket.emit('typing-msg', {
      senderId: user.id,
      receiverId: currentFriend._id,
      msg: '',
    });

    setNewMessage('');
  };

  const handleEmojiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const sentEmonji = (emoji) => {
    setNewMessage(newMessage + emoji.emoji);
    socket.emit('typing-msg', {
      senderId: user.id,
      receiverId: currentFriend._id,
      msg: emoji.emoji,
    });
  };

  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(fetchMessages(currentFriend._id));
  }, [currentFriend._id]);

  useEffect(() => {
    socket.emit('join', user.id);
    socket.on('receiveMessage', (message) => {
      // console.log('Received message:', message);
      setSocketMessage(message);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [user.id]);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === user.id
      ) {
        dispatch(addMessages(socketMessage));
      }
      dispatch(
        updateLastMessage({
          friendId:
            socketMessage.senderId !== user.id
              ? socketMessage.senderId
              : socketMessage.receiverId,
          message: socketMessage,
        })
      );
    }
    setSocketMessage('');
  }, [socketMessage]);

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
            <>
              <IconButton aria-label='send' onClick={handleEmojiOpen}>
                <BsEmojiSmile />
              </IconButton>
              {selectedImage && (
                <Box position='relative' display='inline-block'>
                  <Avatar
                    src={URL.createObjectURL(selectedImage)}
                    variant='square'
                    sx={{ width: 150, height: 150 }}
                  />
                  <IconButton
                    aria-label='remove'
                    onClick={removeSelectedImage}
                    sx={{
                      position: 'absolute',
                      top: -1,
                      right: -10,
                      backgroundColor: 'white',
                      padding: '2px',
                      '&:hover': {
                        backgroundColor: 'rgb(192,192,192)',
                        color: 'white',
                      },
                    }}>
                    <BsXCircle />
                  </IconButton>
                </Box>
              )}
            </>
          ),
          endAdornment: (
            <>
              <IconButton aria-label='send' onClick={sendMessage}>
                <BsSend />
              </IconButton>
              <IconButton aria-label='photo' onClick={handleImageClick}>
                <input
                  type='file'
                  id='image-upload'
                  style={{ display: 'none' }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
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
