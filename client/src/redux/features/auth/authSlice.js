import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const initialState = {
  user: user || null,
  token: token || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkApi) => {
    try {
      return await authService.signup(user);
    } catch (error) {
      const message =
        error.response.data.error ||
        error.response.data.message ||
        error.response.data.data;

      return thunkApi.rejectWithValue(message);
    }
  }
);

// signup
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      error.response.data.error ||
      error.response.data.message ||
      error.response.data.data;

    return thunkApi.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = user || null;
      state.token = token || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload.data.user;
        state.token = payload.token;
        // console.log(payload);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetAuth, logout } = authSlice.actions;

export default authSlice.reducer;
