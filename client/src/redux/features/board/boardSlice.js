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
  createUpdateBoard: {
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

export const createNewBoard = createAsyncThunk(
  "auth/createNewBoard",
  async (payload, thunkApi) => {
    try {
      return await boardService.createNewBoard(payload);
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
  reducers: {
    resetCreateUpdateBoard: (state) => {
      state.createUpdateBoard.isSuccess = false;
      state.createUpdateBoard.isLoading = false;
      state.createUpdateBoard.isError = false;
      state.createUpdateBoard.message = "";
    },
  },
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
      })

      // Create new board
      .addCase(createNewBoard.pending, (state) => {
        state.createUpdateBoard.isLoading = true;
      })
      .addCase(createNewBoard.fulfilled, (state, { payload }) => {
        state.createUpdateBoard.isLoading = false;
        state.createUpdateBoard.isSuccess = true;
        state.createUpdateBoard.isError = false;
        // console.log(payload);
      })
      .addCase(createNewBoard.rejected, (state, { payload }) => {
        state.createUpdateBoard.isSuccess = false;
        state.createUpdateBoard.isLoading = false;
        state.createUpdateBoard.isError = true;
        state.createUpdateBoard.message = payload;
      });
  },
});

export const { resetCreateUpdateBoard } = boardSlice.actions;

export default boardSlice.reducer;
