import axios from 'axios';

import { success, error } from '../reducers/authReducer';
const URL = 'http://localhost:5000/api/messenger';

export const userRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/user-register`, data);

      const user = {
        email: response.data.savedUser.email,
        id: response.data.savedUser._id,
        image: response.data.savedUser.image,
        token: response.data.accessToken,
        username: response.data.savedUser.userName,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(success({ user, successMessage: response.data.successMessage }));
    } catch (err) {
      console.log(error);
      // dispatch(error({ errorMessage: err }));
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`${URL}/user-login`, data, config);

      localStorage.setItem('user', JSON.stringify(response.data.userInfo));
      dispatch(success({ user: response.data.userInfo }));
    } catch (err) {
      dispatch(error({ errorMessage: err }));
    }
  };
};

// Add a request interceptor
// axios.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem('user')).token;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
