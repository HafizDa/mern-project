const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Appointment",
    },

    text: {
      type: String,
      required: [true, "Please enter a text"],
    },

    isStaff: {
      type: Boolean,
      required: false,
    },

    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
