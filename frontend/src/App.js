import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewAppointment from "./pages/NewAppointment";
import Appointments from "./pages/Appointments";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-appointment" element={<PrivateRoute />}>
              <Route path="/new-appointment" element={<NewAppointment />} />
            </Route>
            <Route path="/appointments" element={<PrivateRoute />}>
              <Route path="/appointments" element={<Appointments />} />
            </Route>
            <Route
              path="/appointment/:appointmentId"
              element={<PrivateRoute />}
            >
              <Route
                path="/appointment/:appointmentId"
                element={<Appointment />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
