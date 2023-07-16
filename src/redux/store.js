import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import conversationSlice from "./slices/conversationSlice";
import messageSlice from "./slices/messageSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        conversation: conversationSlice,
        message: messageSlice,
    }
});

export default store;