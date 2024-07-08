import {
  Avatar,
  Paper,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { CiEdit, CiSearch } from 'react-icons/ci';
import ActivePeople from './ActivePeople';
import ChatList from './ChatList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getChatList } from '../../../store/actions/chatAction';
import {
  setCurrentFriend,
  setActiveUser,
} from '../../../store/reducers/chatReducer';
import { io } from 'socket.io-client';
const UserProfile = () => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:7000');

  const { chatList } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.auth);

  const { activeUser } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChatList());
  }, []);

  useEffect(() => {
    socket.emit('addActiveUser', user.id, user);
  }, []);

  useEffect(() => {
    socket.on('getActiveUser', (users) => {
      const filterUser = users.filter((u) => u.userId !== user.id);

      dispatch(setActiveUser(filterUser));
    });
  }, []);

  return (
    <Box sx={{ width: '25vw' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={1}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Avatar src={`http://localhost:5000/${user.image}`} />
          <Typography variant='body1'>{user.username}</Typography>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={1}>
          <IoEllipsisVerticalCircle />
          <CiEdit />
        </Stack>
      </Stack>
      <TextField
        label='Search'
        variant='outlined'
        size='small'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <CiSearch />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 4 }}
      />
      <Stack sx={{ mt: 4 }} spacing={4}>
        <ActivePeople key={user.id} activeUser={activeUser} />
        <Box sx={{ height: '500px', overflowY: 'auto' }}>
          {chatList.friends && chatList.friends.length > 0 ? (
            chatList.friends.map((friend) => (
              <div
                key={friend.fndInfo._id}
                onClick={() => dispatch(setCurrentFriend(friend.fndInfo))}>
                <ChatList friend={friend} />
              </div>
            ))
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;
