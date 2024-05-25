import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

const store = configureStore({
  reducer: { auth: authReducer, chat: chatReducer },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
