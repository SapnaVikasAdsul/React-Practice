// features/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: "John" },
    { id: 2, name: "Peter" },
    { id: 3, name: "Alice" },
    { id: 4, name: "David" },
    { id: 5, name: "Sam" },
    { id: 6, name: "Chris" },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },

    deleteUser(state, action) {
      state.users = state.users.filter(
        user => user.id !== action.payload
      );
    },

    updateUser(state, action) {
      const { id, name } = action.payload;

      const user = state.users.find(
        user => user.id === id
      );

      if (user) {
        user.name = name;
      }
    },
  },
});

export const {
  addUser,
  deleteUser,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;