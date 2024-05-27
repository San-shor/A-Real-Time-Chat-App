import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  chatList: [],
  currentFriend: '',
  messages: [],
};

const chatReducer = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    getChat: (state, action) => {
      state.chatList = action.payload;
    },
    setCurrentFriend: (state, action) => {
      state.currentFriend = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { getChat, setCurrentFriend, setMessages, addMessages } =
  chatReducer.actions;

export default chatReducer.reducer;
