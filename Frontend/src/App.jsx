import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from './store/reducers/authReducer';
import ChatView from './components/Chat/ChatView';
const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatView />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { successMessage, snackbarOpen } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(setSnackbar(false));
  };
  return (
    <>
      <RouterProvider router={router} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
