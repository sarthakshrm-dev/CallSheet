const Appointment = require("../models/appointment");
const User = require("../models/user");
const mongoose = require('mongoose');

// Requesting an appointment

exports.createAppointment = async (req, res) => {
  const { artist, director, startTime, endTime, startDate, endDate, title, location, description } = req.body;

  try {
    // Check if there is already an appointment scheduled at the requested time
    const existingAppointment = await Appointment.findOne({
      startDate,
      endDate,
      startTime,
      endTime,
    });

    // If there is an existing appointment, increment the time by 1 hour and try again
    if (existingAppointment) {
      // If an existing appointment is found, increment the time by 1 minute and try again
      var newStartTime = new Date(endTime);
      newStartTime.setMinutes(newStartTime.getMinutes() + 1);

      var newEndTime = new Date(newStartTime);
      newEndTime.setMinutes(
        newEndTime.getMinutes() +
        (endTime.getMinutes() - startTime.getMinutes())
      );

      // Recursively call the API endpoint with the incremented time
      req.body.startTime = newStartTime;
      req.body.endTime = newEndTime;
      return res.status(409).json({
        success: false,
        message: `There is already an appointment scheduled from ${startTime} to ${endTime}. Please choose a different time.`,
        nextAvailableTime: newEndTime.toISOString(),
      });
    }

    let isArtist
    let isDirector

    if (artist) {
      isArtist = await User.findOne({ _id: artist });
      if (!isArtist) {
        return res.status(404).json({
          success: false,
          message: "Not an artist",
        });
      }
    }
    if (director) {
      isDirector = await User.findOne({ _id: director });
      if (!isDirector) {
        return res.status(404).json({
          success: false,
          message: "Not a director",
        });
      }
    }

    const overlappingTiming = isArtist.timings.find(
      (timing) => timing.start < newStartTime && timing.end > newEndTime
    );

    if (overlappingTiming) {
      res.status(400).send("Artist is not available at the requested time");
    } else {

      let data = {
        startTime,
        endTime,
        startDate,
        endDate,
        title,
        location,
        description
      }

      if (isArtist) {
        data.artist = isArtist._id
      }
      if (isDirector) {
        data.director = isDirector._id;
      }

      if (artist && director) {
        data.status = "requested"
      } else {
        data.status = "accepted"
      }

      if(req.user.id === artist) {
        data.requested = director
      } else if(req.user.id === director) {
        data.requested = artist
      } else {
        res.status(400).send("Wrong id provided!");
      }

      // Create the appointment with the requested information
      const appointment = new Appointment(data);

      await appointment.save();
      return res.status(200).json({
        success: true,
        message: "Appointment created successfully",
        appointment,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//accepting an appointment

exports.acceptAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "accepted" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Appointment accepted successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//rejecting an appointment

exports.rejectAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "rejected" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Appointment rejected successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//rescheduling an appointment

exports.rescheduleAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const { startTime, endTime, startDate, endDate } = req.body;

  try {
    if (!startTime && !endTime && !startDate && !endDate) {
      return res.status(404).json({
        success: false,
        error: "Please enter Time and Date",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { location, title, notes, startTime, endTime, startDate, endDate, status: "requested" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//deleting an appointment

exports.deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.deleteOne({ _id: appointmentId });
    res.json({
      success: true,
      message: "Appointment deleted successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//completing appointment

exports.completeAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "completed" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Appointment completed successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let appointmentsQuery = {};

    if (id !== userId) {
      if (!user.public) {
        const exists = user.callsheetAccess.find(follow => follow.userId.equals(new mongoose.Types.ObjectId(id)));

        if (!(exists && exists.status === 'approved')) {
          return res.status(400).json({
            success: false,
            message: "You are not permitted to access details of this user",
          });
        }
      }

      appointmentsQuery = {
        [type]: id,
        time: { $gte: new Date() }
      };
    } else {
      appointmentsQuery[type] = id;
    }

    const appointments = await Appointment.find(appointmentsQuery);

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getSortedAppointments = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    if (type === "artist") {
      const appointments = await Appointment.find({ artist: id })
        .populate("artist")
        .populate("director")
        .sort({
          createdAt: -1,
        });

      if (!appointments) {
        return res.status(404).json({
          success: false,
          message: "Appointments not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          appointments: appointments,
        });
      }
    } else if (type === "director") {
      const appointments = await Appointment.find({ director: id })
        .populate("artist")
        .populate("director")
        .sort({
          createdAt: -1,
        });

      if (!appointments) {
        return res.status(404).json({
          success: false,
          message: "Appointments not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          appointments: appointments,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Type",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAppointmentsByDate = async (req, res) => {
  try {
    const { date, type, id } = req.params;

    // Parse the date string into a JavaScript Date object
    const selectedDate = new Date(date);

    // Set the time to start of the selected date
    selectedDate.setHours(0, 0, 0, 0);

    // Set the time to end of the most future date
    const futureDate = new Date("9999-12-31");
    futureDate.setHours(23, 59, 59, 999);

    if (type === "artist") {
      // Query appointments from the selected date till the most future date and sort by createdAt in descending order
      const appointments = await Appointment.find({
        artist: id,
        startTime: { $gte: selectedDate, $lte: futureDate },
      })
        .populate("artist")
        .populate("director");

      if (!appointments) {
        return res.status(404).json({
          success: false,
          message: "Appointments not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          appointments: appointments,
        });
      }
    } else if (type === "director") {
      // Query appointments from the selected date till the most future date and sort by createdAt in descending order
      const appointments = await Appointment.find({
        director: id,
        startTime: { $gte: selectedDate, $lte: futureDate },
      })
        .populate("artist")
        .populate("director");

      if (!appointments) {
        return res.status(404).json({
          success: false,
          message: "Appointments not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          appointments: appointments,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Type",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.deleteOne({ _id: id });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        appointment: appointment,
        message: "Appointment deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
