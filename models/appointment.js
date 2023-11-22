const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  title: { type: String },
  artist: { type: mongoose.Types.ObjectId, ref: "User" },
  director: { type: mongoose.Types.ObjectId, ref: "User" },
  requested: { type: mongoose.Types.ObjectId, ref: "User" },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String },
  status: {
    enum: ["requested", "accepted", "rejected", "completed"],
    type: String,
    default: "requested",
  },
  description: { type: String },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

// let of all appointments got
