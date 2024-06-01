import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  authenticate: false,
  successMessage: '',
  errorMessage: '',
  snackbarOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    success: (state, action) => {
      state.user = action.payload.user;
      state.authenticate = true;
      state.successMessage = action.payload.successMessage;
      state.errorMessage = '';
      state.snackbarOpen = true;
    },
    error: (state, action) => {
      state.user = null;
      state.authenticate = false;
      state.successMessage = '';
      state.errorMessage = action.payload.errorMessage;
      state.snackbarOpen = true;
    },
    setSnackbar: (state, action) => {
      state.snackbarOpen = action.payload;
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
});

export const { success, error, setSnackbar } = authSlice.actions;

export default authSlice.reducer;
