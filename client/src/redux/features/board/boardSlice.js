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
  createAndUpdateBoard: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  deleteBoard: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  createAndUpdateTask: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  deleteTask: {
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

// create task
export const createTask = createAsyncThunk(
  "auth/createTask",
  async (payload, thunkApi) => {
    try {
      return await boardService.createTask(payload);
    } catch (error) {
      const message =
        error.response.data.error ||
        error.response.data.message ||
        error.response.data.data;

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "auth/deleteTask",
  async (payload, thunkApi) => {
    try {
      return await boardService.deleteTask(payload);
    } catch (error) {
      const message =
        error.response.data.error ||
        error.response.data.message ||
        error.response.data.data;

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "auth/updateTask",
  async (payload, thunkApi) => {
    try {
      return await boardService.updateTask(payload);
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
      state.createAndUpdateBoard.isSuccess = false;
      state.createAndUpdateBoard.isLoading = false;
      state.createAndUpdateBoard.isError = false;
      state.createAndUpdateBoard.message = "";
    },
    resetDeleteBoard: (state) => {
      state.deleteBoard.isSuccess = false;
      state.deleteBoard.isLoading = false;
      state.deleteBoard.isError = false;
      state.deleteBoard.message = "";
    },

    resetCreateTask: (state) => {
      state.createAndUpdateTask.isSuccess = false;
      state.createAndUpdateTask.isLoading = false;
      state.createAndUpdateTask.isError = false;
      state.createAndUpdateTask.message = "";
    },
    resetDeletetask: (state) => {
      state.deleteTask.isSuccess = false;
      state.deleteTask.isLoading = false;
      state.deleteTask.isError = false;
      state.deleteTask.message = "";
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
        state.createAndUpdateBoard.isLoading = true;
      })
      .addCase(createNewBoard.fulfilled, (state, { payload }) => {
        state.createAndUpdateBoard.isLoading = false;
        state.createAndUpdateBoard.isSuccess = true;
        state.createAndUpdateBoard.isError = false;
        // console.log(payload);
      })
      .addCase(createNewBoard.rejected, (state, { payload }) => {
        state.createAndUpdateBoard.isSuccess = false;
        state.createAndUpdateBoard.isLoading = false;
        state.createAndUpdateBoard.isError = true;
        state.createAndUpdateBoard.message = payload;
      })

      // update board
      .addCase(updateBoard.pending, (state) => {
        state.createAndUpdateBoard.isLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        state.createAndUpdateBoard.isLoading = false;
        state.createAndUpdateBoard.isSuccess = true;
        state.createAndUpdateBoard.isError = false;
      })
      .addCase(updateBoard.rejected, (state, { payload }) => {
        state.createAndUpdateBoard.isSuccess = false;
        state.createAndUpdateBoard.isLoading = false;
        state.createAndUpdateBoard.isError = true;
        state.createAndUpdateBoard.message = payload;
      })

      // delete board
      .addCase(deleteBoard.pending, (state) => {
        state.deleteBoard.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        state.deleteBoard.isLoading = false;
        state.deleteBoard.isSuccess = true;
        state.deleteBoard.isError = false;
      })
      .addCase(deleteBoard.rejected, (state, { payload }) => {
        state.deleteBoard.isSuccess = false;
        state.deleteBoard.isLoading = false;
        state.deleteBoard.isError = true;
        state.deleteBoard.message = payload;
      })

      // create task
      .addCase(createTask.pending, (state) => {
        state.createAndUpdateTask.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.createAndUpdateTask.isLoading = false;
        state.createAndUpdateTask.isSuccess = true;
        state.createAndUpdateTask.isError = false;
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.createAndUpdateTask.isSuccess = false;
        state.createAndUpdateTask.isLoading = false;
        state.createAndUpdateTask.isError = true;
        state.createAndUpdateTask.message = payload;
      })

      // Update board
      .addCase(updateTask.pending, (state) => {
        state.createAndUpdateTask.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.createAndUpdateTask.isLoading = false;
        state.createAndUpdateTask.isSuccess = true;
        state.createAndUpdateTask.isError = false;
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.createAndUpdateTask.isSuccess = false;
        state.createAndUpdateTask.isLoading = false;
        state.createAndUpdateTask.isError = true;
        state.createAndUpdateTask.message = payload;
      })

      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.deleteTask.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.deleteTask.isLoading = false;
        state.deleteTask.isSuccess = true;
        state.deleteTask.isError = false;
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.deleteTask.isSuccess = false;
        state.deleteTask.isLoading = false;
        state.deleteTask.isError = true;
        state.deleteTask.message = payload;
      });
  },
});

export const {
  resetCreateUpdateBoard,
  resetDeleteBoard,
  resetCreateTask,
  resetDeletetask,
} = boardSlice.actions;

export default boardSlice.reducer;
