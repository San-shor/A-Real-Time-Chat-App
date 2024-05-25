import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../store/actions/authAction';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authenticate } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: undefined,
  });

  const [loadImage, setLoadImage] = useState('');
  const inputHandleChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const { userName, email, password, confirmPassword, image } = state;
    e.preventDefault();

    const data = new FormData();
    data.append('userName', userName);
    data.append('email', email);
    data.append('password', password);
    data.append('confirmPassword', confirmPassword);
    data.append('image', image);

    dispatch(userRegister(data));
  };

  useEffect(() => {
    if (authenticate) navigate('/');
  }, [authenticate]);

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='given-name'
                name='userName'
                required
                fullWidth
                id='userName'
                label='User Name'
                value={state.userNameName}
                onChange={inputHandleChange}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={state.email}
                onChange={inputHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                autoComplete='new-password'
                value={state.password}
                onChange={inputHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                autoComplete='confirm-password'
                value={state.confirmPassword}
                onChange={inputHandleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>{loadImage ? <Avatar src={loadImage} /> : ''}</Box>
              <TextField
                required
                name='image'
                // label='Select Image'
                type='file'
                id='image'
                onChange={fileHandle}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='Remember Me'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
