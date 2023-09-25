import axios from "axios";

const API_URL = "/api/appointments/";

// Get appointment notes
const getNotes = async (appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("API call to:", API_URL + appointmentId + "/notes");

  try {
    const response = await axios.get(
      API_URL + appointmentId + "/notes",
      config
    );
    console.log("API response for getting notes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching notes:", error);
    throw error;
  }
};

// Create appointment note
const createNote = async (noteText, appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(
    "API call to:",
    API_URL + appointmentId + "/notes",
    "with data:",
    { text: noteText }
  );

  try {
    const response = await axios.post(
      API_URL + appointmentId + "/notes",
      {
        text: noteText,
      },
      config
    );
    console.log("API response for creating note:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while creating note:", error);
    throw error;
  }
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
