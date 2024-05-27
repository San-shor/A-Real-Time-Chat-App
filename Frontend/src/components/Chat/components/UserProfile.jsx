import {
  Avatar,
  Paper,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import { CiEdit, CiSearch } from 'react-icons/ci';
import ActivePeople from './ActivePeople';
import ChatList from './ChatList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getChatList } from '../../../store/actions/chatAction';
import { setCurrentFriend } from '../../../store/reducers/chatReducer';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { chatList } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getChatList());
  }, []);
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={1}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Avatar src={`http://localhost:5000/${user.userInfo.image}`} />
          <Typography variant='body1'>{user.userInfo.username}</Typography>
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
        <ActivePeople />
        {chatList.friends && chatList.friends.length > 0 ? (
          chatList.friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => dispatch(setCurrentFriend(friend))}>
              <ChatList friend={friend} />
            </div>
          ))
        ) : (
          <></>
        )}
      </Stack>
    </Paper>
  );
};

export default UserProfile;
