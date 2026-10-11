// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import apiUsersReducer from "../../reduxApiUsers/usersApiSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        apiUsers: apiUsersReducer,
    },
});
