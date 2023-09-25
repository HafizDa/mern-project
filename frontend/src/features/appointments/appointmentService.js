import axios from "axios";

const API_URL = "/api/appointments/";

// Create new appointment
const createAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, appointmentData, config);
  return response.data;
};

// Get user appointments
const getAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user appointment
const getAppointment = async (appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + appointmentId, config);

  return response.data;
};

// close appointment
const closeAppointment = async (appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + appointmentId,
    { status: "closed" },
    config
  );

  return response.data;
};

const appointmentService = {
  createAppointment,
  getAppointments,
  getAppointment,
  closeAppointment,
};

export default appointmentService;
