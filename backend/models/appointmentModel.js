const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    services: {
      type: String,
      required: [true, "Select a service"],
      enum: ["Haircut", "Haircut & Beard Shave", "Haircut & Coloring"],
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointment", appointmentSchema);

// const mongoose = require("mongoose");

// const appointmentSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },

//     services: {
//       type: [String],
//       required: [true, "Select a service"],
//       enum: [
//         "Haircut",
//         "Women's Haircut",
//         "Machine Shave",
//         "Haircut & Beard Shave",
//         "Haircut & Coloring",
//       ],
//     },

//     status: {
//       type: String,
//       required: true,
//       enum: ["new", "open", "closed"],
//       default: "new",
//     },

//     date: {
//       type: Date,
//       required: [true, "Please specify the date of the appointment"],
//     },

//     time: {
//       type: String,
//       required: [true, "Please specify the time of the appointment"],
//     },

//     barber: {
//       type: String,
//       required: [true, "Please specify the barber"],
//     },

//     feedback: {
//       type: String,
//       maxlength: 500,
//     },

//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//     },

//     specialNotes: {
//       type: String,
//       maxlength: 300,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// appointmentSchema.index({ user: 1, date: 1 });

// module.exports = mongoose.model("Appointment", appointmentSchema);

// const mongoose = require("mongoose");

// const appointmentSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },

//     services: {
//       type: [String],
//       required: [true, "Select a service"],
//       enum: [
//         "Haircut",
//         "Women's Haircut",
//         "Machine Shave",
//         "Haircut & Beard Shave",
//         "Haircut & Coloring",
//       ],
//     },

//     status: {
//       type: String,
//       required: true,
//       enum: ["new", "open", "closed"],
//       default: "new",
//     },

//     date: {
//       type: Date,
//       required: [true, "Please specify the date of the appointment"],
//     },

//     time: {
//       type: String,
//       required: [true, "Please specify the time of the appointment"],
//     },

//     barber: {
//       type: String,
//       required: [true, "Please specify the barber"],
//     },

//     feedback: {
//       type: String,
//       maxlength: 500,
//     },

//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//     },

//     specialNotes: {
//       type: String,
//       maxlength: 300,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// appointmentSchema.index({ user: 1, date: 1 });

// module.exports = mongoose.model("Appointment", appointmentSchema);
