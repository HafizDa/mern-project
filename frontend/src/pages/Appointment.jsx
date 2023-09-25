import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointment,
  closeAppointment,
} from "../features/appointments/appointmentSlice";
import {
  createNote,
  getNotes,
  reset as notesReset,
} from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Appointment() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { appointment, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.appointments
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appointmentId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAppointment(appointmentId));
    dispatch(getNotes(appointmentId));
    // eslint-disable-next-line
  }, [isError, message, appointmentId]);

  //Close Appointment
  const onAppointmentClose = () => {
    dispatch(closeAppointment(appointmentId));
    toast.success("Appointment closed successfully");
    navigate("/appointments");
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, appointmentId }))
      .unwrap()
      .then(() => {
        dispatch(getNotes(appointmentId)); // Refetch the notes after adding a new one
        setNoteText("");
        closeModal();
      })
      .catch((error) => {
        toast.error("Failed to add note: " + error.message);
      });
  };

  //Open/ Close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="appointment-page">
      <BackButton url="/appointments" />
      <br />
      <header className="appointment-header">
        <h1>Appointment</h1>
        <h2>
          Appointment ID: {appointment._id}
          <span className={`status-btn status-${appointment.status}`}>
            {appointment.status === "new" ? "New" : appointment.status}
          </span>
        </h2>
        <h3>
          Date Submitted:
          {new Date(appointment.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Services: {appointment.services}</h3>
        <div className="appointment-desc">
          <h3>Description:</h3>
          <p>{appointment.description}</p>
        </div>
        <h2>Notes</h2>
        {appointment.status !== "closed" ? (
          <button onClick={openModal} className="btn">
            <FaPlus />
            Add Note
          </button>
        ) : (
          <button className="btn btn-closed">Closed</button>
        )}
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="note"
              className="form-control"
              placeholder="Add text here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group"></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {appointment.status !== "closed" && (
        <button
          onClick={onAppointmentClose}
          className="btn btn-block btn-danger"
        >
          Close Appointment
        </button>
      )}
    </div>
  );
}

export default Appointment;
