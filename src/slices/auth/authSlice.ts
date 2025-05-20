import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    username: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    username: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ token: string; username: string }>) {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem('token', action.payload.token);
        },
        clearCredentials(state) {
            state.token = null;
            state.username = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
