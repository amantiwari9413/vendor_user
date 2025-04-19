import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage if available
const getInitialState = () => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    return JSON.parse(storedAuth);
  }
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log('loginSuccess action payload:', action.payload); // Debug log
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      // Save to localStorage
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      }));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      // Clear localStorage
      localStorage.removeItem('auth');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer; 