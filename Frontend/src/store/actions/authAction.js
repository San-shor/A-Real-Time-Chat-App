import axios from 'axios';

import { success, error } from '../reducers/authReducer';
const URL = 'http://localhost:5000/api/messenger';

export const userRegister = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/user-register`, data);
      console.log(response.data);

      localStorage.setItem('authToken', response.data.userInfo.token);
      dispatch(success(response.data));
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

      localStorage.setItem('authToken', response.data.userInfo.token);
      dispatch(success(response.data));
    } catch (err) {
      dispatch(error({ errorMessage: err }));
    }
  };
};

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);