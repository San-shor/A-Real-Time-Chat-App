import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  chatList: [],
};

const chatReducer = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    getChat: (state, action) => {
      state.chatList = action.payload;
    },
  },
});

export const { getChat } = chatReducer.actions;

export default chatReducer.reducer;
