import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAppointment,
  reset,
} from "../features/appointments/appointmentSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewAppointment() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.appointments
  );
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [services, setServices] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/appointments");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment({ services, description }));
  };

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Book New Appointment</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="services">Services</label>
            <select
              name="services"
              id="services"
              value={services}
              onChange={(e) => setServices(e.target.value)}
            >
              <option value="">Select a service</option>
              <option value="Haircut">Haircut</option>
              <option value="Haircut & Beard Shave">
                Haircut & Beard Shave
              </option>
              <option value="Haircut & Coloring">Haircut & Coloring</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
            Book Appointment
          </div>
        </form>
      </section>
    </>
  );
}

export default NewAppointment;
