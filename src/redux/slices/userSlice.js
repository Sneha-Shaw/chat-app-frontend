import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_HOST;

const nameSpace = "user";

const initialState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

//   signin

export const login = createAsyncThunk(
    `${nameSpace}/login`,
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const res = await axios.post(`${API}/api/users/login`, data);
            if (res.data.success) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.data));
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// register

export const register = createAsyncThunk(
    `${nameSpace}/register`,
    async (data, { rejectWithValue }) => {
        try {

            const res = await axios.post(`${API}/api/users/register`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// verify token

export const verifyToken = createAsyncThunk(
    `${nameSpace}/verifyToken`,
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API}/api/users/verifyToken`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// getusers

export const getUsers = createAsyncThunk(
    `${nameSpace}/getUsers`,
    async (data, { rejectWithValue }) => {
        try {
          
            const res = await axios.get(`${API}/api/users/all`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// search users

export const searchUsers = createAsyncThunk(
    `${nameSpace}/searchUsers`,
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);  
            const body = {
                name: data
            }
            const res = await axios.post(`${API}/api/users/search`, body);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// user slice

const userSlice = createSlice({
    name: nameSpace,
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers(builder) {

        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(verifyToken.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        });

        builder.addCase(verifyToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        });

        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(searchUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.success = true;
        });

        builder.addCase(searchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
