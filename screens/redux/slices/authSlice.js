import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../data/data'; // Import your dummy data file
import { ToastAndroid } from 'react-native';

export const authenticateUser = createAsyncThunk('auth/authenticateUser', async (credentials) => {
    if (!credentials.username || !credentials.password) {
        throw new Error('Name or password missing');
    }

    const user = data.users.find((u) => {
        return u.username === credentials.username.trim() && u.password === credentials.password;
    });

    if (user) {
        await AsyncStorage.setItem('userToken', JSON.stringify(user.id)); // Save token to AsyncStorage
        return user.id; // Return user ID as token
    } else {
        ToastAndroid.showWithGravity(
            'Invalid name or password',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
});

export const checkStoredToken = createAsyncThunk('auth/checkStoredToken', async () => {
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
        logoutSuccess: (state) => {
            state.userToken = null;
            state.loginError = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.isLoading = true;
            state.loginError = '';
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.userToken = action.payload; // Update state with the token
            state.isLoading = false;
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.loginError = action.error.message;
        });
        builder.addCase(checkStoredToken.fulfilled, (state, action) => {
            state.userToken = action.payload; // Load token from AsyncStorage
        });
    },
});

export const { logoutSuccess } = authSlice.actions;

export const logoutUser = () => async (dispatch) => {
    await AsyncStorage.removeItem('userToken'); // Clear token on logout
    dispatch(logoutSuccess());
};

export default authSlice.reducer;
