import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/register', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    fieldErrors: {},
    isAuthenticated: false,
  },
  reducers: {
    initAuth: (state) => {
      const token = Cookies.get('token');
      const user = Cookies.get('user');
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
      Cookies.remove('user');
    },
    clearErrors: (state) => {
      state.error = null;
      state.fieldErrors = {};
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        Cookies.set('token', action.payload.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur lors de l\'inscription';
        state.fieldErrors = action.payload?.errors || {};
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        Cookies.set('token', action.payload.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur lors de la connexion';
        state.fieldErrors = action.payload?.errors || {};
      });
  },
});

export const { initAuth, logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
