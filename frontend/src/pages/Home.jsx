import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Wellcome to BarbershopMP</h1>
        <p>Get your hair cut with sinior barbers.</p>
      </section>
      <Link to="/new-appointment" className="btn btn-block">
        <FaQuestionCircle />
        Book An Appointment
      </Link>
      <br />
      <Link to="/appointments" className="btn btn-block">
        <FaTicketAlt /> View My Appointments
      </Link>
    </>
  );
}

export default Home;
