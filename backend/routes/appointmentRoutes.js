const express = require("express");
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

//Re-route into note router
const noteRouter = require("./noteRoutes");
router.use("/:appointmentId/notes", noteRouter);

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router
  .route("/:id")
  .get(protect, getAppointment)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

module.exports = router;
