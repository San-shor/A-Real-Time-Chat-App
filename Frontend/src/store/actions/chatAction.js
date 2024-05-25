import axios from 'axios';
import { getChat } from '../reducers/chatReducer';

const URL = 'http://localhost:5000/api/messenger';
export const getChatList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/chatList`);
    dispatch(getChat(response.data));
  } catch (error) {
    console.log(error);
  }
};
