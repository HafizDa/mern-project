import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import noteReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    notes: noteReducer,
  },
});
