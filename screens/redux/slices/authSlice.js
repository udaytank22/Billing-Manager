// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // API URL (adjust based on your backend)
// const API_URL = 'https://your-backend-url.com/api/login';

// // Login action with API call
// export const login = createAsyncThunk(
//     'auth/login',
//     async ({ username, password }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(API_URL, { username, password });
//             const { token } = response.data;

//             // Store token in AsyncStorage
//             await AsyncStorage.setItem('userToken', 'uday');
//             return token;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || 'Login failed. Please try again.'
//             );
//         }
//     }
// );

// // Check token existence during app load
// export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async () => {
//     const token = await AsyncStorage.getItem('userToken');
//     return token;
// });

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         isLoading: false,
//         userToken: null,
//         loginError: '',
//     },
//     reducers: {
//         logoutSuccess: (state) => {
//             state.userToken = null;
//             state.loginError = '';
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Handle login
//             .addCase(login.pending, (state) => {
//                 state.isLoading = true;
//                 state.loginError = '';
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.userToken = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.loginError = action.payload;
//             })

//             // Handle token check
//             .addCase(isLoggedIn.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(isLoggedIn.fulfilled, (state, action) => {
//                 state.userToken = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(isLoggedIn.rejected, (state) => {
//                 state.isLoading = false;
//             });
//     },
// });

// export const { logoutSuccess } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async () => {
    const token = await AsyncStorage.getItem('userToken');
    return token;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        userToken: null,
        loginError: '',
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.userToken = action.payload;
            state.loginError = '';
        },
        logoutSuccess: (state) => {
            state.userToken = null;
            state.loginError = '';
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(isLoggedIn.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(isLoggedIn.fulfilled, (state, action) => {
            state.userToken = action.payload;
            state.isLoading = false;
        });
        builder.addCase(isLoggedIn.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { loginSuccess, logoutSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
