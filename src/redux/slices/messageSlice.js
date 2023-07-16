import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "message";

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

// delete message
export const deleteMessage = createAsyncThunk(
    `${nameSpace}/deleteMessage`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API}/api/messages/delete-messages/${data.messageId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// messageSlice
const messageSlice = createSlice({
    name: nameSpace,
    initialState,
    reducers: {
        reset: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers(builder) {

        builder.addCase(deleteMessage.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteMessage.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.success = true;
        });

        builder.addCase(deleteMessage.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

    }
});

export const { reset } = messageSlice.actions;

export default messageSlice.reducer;