const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

//@desc:   Get user appointments
//@route:  Get  /api/appointments
//@access:   Private
const getAppointments = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const appointments = await Appointment.find({ user: user.id });

  res.status(200).json(appointments);
});

// //@desc:   Get user appointment
// //@route:  Get /api/appointments/:id
//@access:   Private
const getAppointment = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  if (appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(appointment);
});

//@desc:   create a new appointment
//@route:   POST /api/appointments
//@access:   Private
const createAppointment = asyncHandler(async (req, res) => {
  const { services, description } = req.body;
  // console.log("Received services value:", services);

  if (!services || !description) {
    res.status(400);
    throw new Error("Please fill a description and services");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const appointment = await Appointment.create({
    services,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(appointment);
});

//@desc:   Delete appointment
//@route:  DELETE /api/appointments/:id
//@access: Private
const deleteAppointment = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (Appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Appointment.remove();

  res.status(200).json({ success: true });
});

//@desc:   Update appointment
//@route:   PUT /api/users/appointments/:id
//@access:   Private
const updateAppointment = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updateAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateAppointment);
});

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
