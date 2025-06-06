import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import userReducer from '../slices/auth/userSile';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


