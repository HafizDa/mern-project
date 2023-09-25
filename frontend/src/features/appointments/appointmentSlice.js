import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

const initialState = {
  appointments: [],
  appointment: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new appointment

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.createAppointment(appointmentData, token);
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

// Get user appointment

export const getAppointments = createAsyncThunk(
  "appointments/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.getAppointments(token);
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

// Get user appointment

export const getAppointment = createAsyncThunk(
  "appointments/get",
  async (appointmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.getAppointment(appointmentId, token);
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

// Close appointment
export const closeAppointment = createAsyncThunk(
  "appointments/close",
  async (appointmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.closeAppointment(appointmentId, token);
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

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.map((appointment) =>
          appointment._id === action.payload._id
            ? (appointment.status = "closed")
            : appointment
        );
      });
  },
});

export const { reset } = appointmentSlice.actions;

export default appointmentSlice.reducer;
