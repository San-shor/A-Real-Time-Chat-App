import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  chatList: [],
  currentFriend: '',
  messages: [],
  messageSendSuccess: false,
  activeUser: [],
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
      state.messageSendSuccess = true;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    updateLastMessage: (state, action) => {
      const { friendId, message } = action.payload;
      const chatIndex = state.chatList.friends.findIndex(
        (chat) => chat.fndInfo._id === friendId
      );
      if (chatIndex !== -1) {
        state.chatList.friends[chatIndex].msgInfo = message;
      }
    },
  },
});

export const {
  getChat,
  setCurrentFriend,
  setMessages,
  addMessages,
  setActiveUser,
  setLastMessage,
  updateLastMessage,
} = chatReducer.actions;

export default chatReducer.reducer;
