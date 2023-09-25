const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Appointment = require("../models/appointmentModel");

//@desc:   Get user appointments
//@route:  Get  /api/appointments/:appointmentId/notes
//@access:   Private
const getNotes = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const appointment = await Appointment.findById(req.params.appointmentId);

  if (appointment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const notes = await Note.find({ appointment: req.params.appointmentId });

  res.status(200).json(notes);
});

//@desc:   Create appointment note
//@route: POST /api/appointments/:appointmentId/notes
//@access:   Private
const addNote = asyncHandler(async (req, res) => {
  //Get user using the id from the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    appointment: req.params.appointmentId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
