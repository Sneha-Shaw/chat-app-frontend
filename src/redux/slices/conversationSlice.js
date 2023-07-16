import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "conversation";

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

// create conversation
export const createConversation = createAsyncThunk(
    `${nameSpace}/createConversation`,
    async (data, { rejectWithValue }) => {
        try {
           
            const response = await axios.post(`${API}/api/conversation/create-conversations`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// get getConversationByUser
export const getConversationByUser = createAsyncThunk(
    `${nameSpace}/getConversationByUser`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/api/conversation/get-conversations/${data.senderId}/${data.receiverId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// conversationSlice
const conversationSlice = createSlice({
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

        builder.addCase(createConversation.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(createConversation.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.success = true;
        }
        );

        builder.addCase(createConversation.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }
        );

        builder.addCase(getConversationByUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getConversationByUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.success = true;
        });

        builder.addCase(getConversationByUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

    }
});

export const { reset } = conversationSlice.actions;

export default conversationSlice.reducer;
