import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "./boardServices";

const initialState = {
  fetchAllBoards: {
    boardsList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

// fetch all boards
export const fetchAllBoards = createAsyncThunk(
  "auth/fetchAllBoards",
  async (_, thunkApi) => {
    try {
      return await boardService.fetchAllBoards();
    } catch (error) {
      const message =
        error.response.data.error ||
        error.response.data.message ||
        error.response.data.data;

      return thunkApi.rejectWithValue(message);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all boards
      .addCase(fetchAllBoards.pending, (state) => {
        state.fetchAllBoards.isLoading = true;
      })
      .addCase(fetchAllBoards.fulfilled, (state, { payload }) => {
        state.fetchAllBoards.isLoading = false;
        state.fetchAllBoards.isSuccess = true;
        state.fetchAllBoards.isError = false;
        state.fetchAllBoards.boardsList = payload.data.boards;
        // console.log(payload);
      })
      .addCase(fetchAllBoards.rejected, (state, { payload }) => {
        state.fetchAllBoards.isSuccess = false;
        state.fetchAllBoards.isLoading = false;
        state.fetchAllBoards.isError = true;
        state.fetchAllBoards.message = payload;
      });
  },
});

// export const {} = boardSlice.actions;

export default boardSlice.reducer;
