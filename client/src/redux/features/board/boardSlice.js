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
  defaultBoard: {
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

// Create new Board
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

// Delete Board
export const deleteBoard = createAsyncThunk(
  "auth/deleteBoard",
  async (id, thunkApi) => {
    try {
      return await boardService.deleteBoard(id);
    } catch (error) {
      const message =
        error.response.data.error ||
        error.response.data.message ||
        error.response.data.data;

      return thunkApi.rejectWithValue(message);
    }
  }
);

// Delete Board
export const updateBoard = createAsyncThunk(
  "auth/updateBoard",
  async (payload, thunkApi) => {
    try {
      return await boardService.updateBoard(payload);
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
      state.defaultBoard.isSuccess = false;
      state.defaultBoard.isLoading = false;
      state.defaultBoard.isError = false;
      state.defaultBoard.message = "";
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
        state.defaultBoard.isLoading = true;
      })
      .addCase(createNewBoard.fulfilled, (state, { payload }) => {
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isSuccess = true;
        state.defaultBoard.isError = false;
        // console.log(payload);
      })
      .addCase(createNewBoard.rejected, (state, { payload }) => {
        state.defaultBoard.isSuccess = false;
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isError = true;
        state.defaultBoard.message = payload;
      })

      // delete board
      .addCase(deleteBoard.pending, (state) => {
        state.defaultBoard.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isSuccess = true;
        state.defaultBoard.isError = false;
      })
      .addCase(deleteBoard.rejected, (state, { payload }) => {
        state.defaultBoard.isSuccess = false;
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isError = true;
        state.defaultBoard.message = payload;
      })

      // update board
      .addCase(updateBoard.pending, (state) => {
        state.defaultBoard.isLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isSuccess = true;
        state.defaultBoard.isError = false;
      })
      .addCase(updateBoard.rejected, (state, { payload }) => {
        state.defaultBoard.isSuccess = false;
        state.defaultBoard.isLoading = false;
        state.defaultBoard.isError = true;
        state.defaultBoard.message = payload;
      });
  },
});

export const { resetCreateUpdateBoard } = boardSlice.actions;

export default boardSlice.reducer;
