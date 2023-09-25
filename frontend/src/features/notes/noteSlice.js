// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import noteService from "./noteService";

// const initialState = {
//   notes: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// // Get appointment notes
// // export const getNotes = createAsyncThunk(
// //   "Note/getAll",
// //   async (appointmentId, thunkAPI) => {
// //     try {
// //       const token = thunkAPI.getState().auth.user.token;
// //       return await noteService.getNotes(appointmentId, token);
// //     } catch (error) {
// //       const message =
// //         (error.response &&
// //           error.response.data &&
// //           error.response.data.message) ||
// //         error.message ||
// //         error.toString();

// //       return thunkAPI.rejectWithValue(message);
// //     }
// //   }
// // );

// // // Create appointment note
// // export const createNote = createAsyncThunk(
// //   "Note/create",
// //   async (noteText, appointmentId, thunkAPI) => {
// //     try {
// //       const token = thunkAPI.getState().auth.user.token;
// //       return await noteService.createNote(noteText, appointmentId, token);
// //     } catch (error) {
// //       const message =
// //         (error.response &&
// //           error.response.data &&
// //           error.response.data.message) ||
// //         error.message ||
// //         error.toString();

// //       return thunkAPI.rejectWithValue(message);
// //     }
// //   }
// // );
// export const createNote = createAsyncThunk(
//   "Note/create",
//   async ({ noteText, appointmentId }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await noteService.createNote(noteText, appointmentId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const noteSlice = createSlice({
//   name: "note",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getNotes.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getNotes.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.notes = action.payload;
//       })
//       .addCase(getNotes.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(createNote.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNote.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.notes.push(action.payload);
//       })
//         .addCase(createNote.rejected, (state, action) => {
//           state.isLoading = false;
//           state.isError = true;
//           state.message = action.payload;
//         });
//   },
// });

// export const { reset } = noteSlice.actions;
// export default noteSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get appointment notes
export const getNotes = createAsyncThunk(
  "Note/getAll",
  async (appointmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(appointmentId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create appointment note
export const createNote = createAsyncThunk(
  "Note/create",
  async ({ noteText, appointmentId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteText, appointmentId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
