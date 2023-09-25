import { Link } from "react-router-dom";

function AppointmentItem({ appointment }) {
  return (
    <div className="appointment">
      <div>{appointment.services}</div>
      <div>{appointment.description}</div>
      <div>{new Date(appointment.createdAt).toLocaleString("en-US")}</div>
      <div className={`status status-${appointment.status}`}>
        {appointment.status}
      </div>
      <Link
        to={`/appointment/${appointment.id || appointment._id}`}
        className="btn btn-reverse btn-sm"
      >
        View
      </Link>
    </div>
  );
}

export default AppointmentItem;
