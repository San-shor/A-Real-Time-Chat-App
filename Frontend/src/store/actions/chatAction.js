import axios from 'axios';
import { getChat, setMessages, addMessages } from '../reducers/chatReducer';

const URL = 'http://localhost:5000/api/messenger';
export const getChatList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/chatList`);
    dispatch(getChat(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/sendMessage`, data);
    console.log(response.data);
    dispatch(addMessages(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessages = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/getMessage/${id}`);
    console.log(response.data);
    dispatch(setMessages(response.data.messages));
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};