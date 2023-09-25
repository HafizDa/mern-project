import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointments,
  reset,
} from "../features/appointments/appointmentSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import AppointmentItem from "../components/AppointmentItem";

function Appointments() {
  const { appointments, isLoading, isSuccess } = useSelector(
    (state) => state.appointments
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton />
      <h1>Appointments</h1>
      <div className="appointment">
        <span>Services</span>
        <span>Description</span>
        <span>Date</span>
        <span>Status</span>
      </div>
      <div className="appointments">
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </>
  );
}

export default Appointments;
