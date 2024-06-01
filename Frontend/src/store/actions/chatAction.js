import axios from 'axios';
import { getChat, setMessages, addMessages } from '../reducers/chatReducer';

const URL = 'http://localhost:5000/api/messenger';
export const getChatList = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.get(`${URL}/chatList`, config);
    console.log(response.data);
    dispatch(getChat(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const messageSend = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.post(`${URL}/sendMessage`, data, config);

    dispatch(addMessages(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const imageMessageSend = (data) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.post(`${URL}/sendImageMessage`, data, config);

    dispatch(addMessages(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessages = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const response = await axios.get(`${URL}/getMessage/${id}`, config);

    dispatch(setMessages(response.data.messages));
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

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
