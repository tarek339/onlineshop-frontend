import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
        state.user = action.payload
    },
    removeUser: (state) => {
        state.user = null
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
    addUser,
    removeUser,
    editUser
} = userSlice.actions;