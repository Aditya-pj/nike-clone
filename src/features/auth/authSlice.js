import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const signInUser = createAsyncThunk('auth/signin',async(credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8000/users', credentials);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const login = createAsyncThunk('auth/login', async(credentials, {rejectWithValue}) => {
    try {
        const response = await axios.get('http://localhost:8000/users');
        const data = await response.data;
        const accountUser = data.find((user) => (user.email == credentials.email && user.password == credentials.password));
        if (accountUser) {
            return accountUser;
        }
        else {
            throw new Error('Account does not exist. Please create a new account');
        }
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isLoggedIn: false
    },
    reducers: {
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
            builder
            .addCase(signInUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoggedIn = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = action.payload;
            })
        }
    }
);

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { signInUser, login };
