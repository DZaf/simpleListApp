// src/slices/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.types';
import { Job } from '../../types/job.types';

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        addJob: (state, action: PayloadAction<Job>) => {
            if (state.user) {
                state.user.jobs = [...state.user.jobs, action.payload];
            }
        },
        removeJob: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.jobs = state.user.jobs.filter(
                    (job) => job.title !== action.payload
                );
            }
        },
    },
});

export const { setUser, clearUser, addJob, removeJob } = userSlice.actions;
export default userSlice.reducer;
