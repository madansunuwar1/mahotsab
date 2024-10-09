import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api, { setAuthHeader } from "../utils/api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user_details; // Ensure consistency here
      state.userId = action.payload.userId;
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set("access_token", action.payload.accessToken);
      Cookies.set("refresh_token", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user_details));
      setAuthHeader(action.payload.accessToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      localStorage.removeItem("user");
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.person; // Ensure consistency here
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set("access_token", action.payload.accessToken);
      Cookies.set("refresh_token", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

// Thunk for login
export const login = (username, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post("auth/login/", { username, password });

    // Extract user ID from the response data
    const userId = response.data?.person?.user?.id;
    console.log(userId); // Log the entire response to inspect the structure
    dispatch(
      loginSuccess({
        user_details: response.data,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        userId: userId, // Save user ID
      })
    );

    return { type: "login/fulfilled", payload: response.data.user_details };
  } catch (error) {
    dispatch(
      loginFailure(
        error.response?.data?.message || "An error occurred during login"
      )
    );
    return { type: "login/rejected", payload: error.message };
  }
};

// Thunk for registration
export const register = (formData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await api.post("v1/user-mgmt/register-farmer/", formData); // Adjusted to use formData directly
    dispatch(
      registerSuccess({
        user_details: response.data.user_details,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      })
    );
  } catch (error) {
    dispatch(
      registerFailure(
        error.response?.data?.message || "An error occurred during registration"
      )
    );
  }
};

export default authSlice.reducer;

export const registerCooperative = (formData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await api.post(
      "v1/user-mgmt/register-corporate/",
      formData
    ); // Adjusted API endpoint for cooperative
    dispatch(
      registerSuccess({
        user_details: response.data.user_details,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      })
    );
  } catch (error) {
    dispatch(
      registerFailure(
        error.response?.data?.message ||
          "An error occurred during cooperative registration"
      )
    );
  }
};
