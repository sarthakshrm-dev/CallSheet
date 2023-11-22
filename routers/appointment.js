const express = require("express");
const router = express.Router();

const AppointmentController = require("../controllers/appointment");
const { verifyTokenAndAuthorization } = require("../middleware/authentication");

router.post(
  "/create-appointment",
  verifyTokenAndAuthorization,
  AppointmentController.createAppointment
);
router.put(
  "/:id/accept",
  verifyTokenAndAuthorization,
  AppointmentController.acceptAppointment
);
router.put(
  "/:id/reject",
  verifyTokenAndAuthorization,
  AppointmentController.rejectAppointment
);
router.delete(
  "/:id/delete",
  verifyTokenAndAuthorization,
  AppointmentController.deleteAppointment
);
router.put(
  "/:id/reschedule",
  verifyTokenAndAuthorization,
  AppointmentController.rescheduleAppointment
);
router.put(
  "/:id/complete",
  verifyTokenAndAuthorization,
  AppointmentController.completeAppointment
);
router.get(
  "/:id/:type/get-appointments",
  verifyTokenAndAuthorization,
  AppointmentController.getAppointments
);

router.get(
  "/:id/:type/get-sorted-appointments",
  verifyTokenAndAuthorization,
  AppointmentController.getSortedAppointments
);

router.get(
  "/:id/:type/:date/get-appointments-by-date",
  verifyTokenAndAuthorization,
  AppointmentController.getAppointmentsByDate
);

module.exports = router;

// get subrole by roleId - DONE
// profilePhoto - DONE
// get user by id - DONE
// change appointments - DONE
// notification by firebase
// logout - DONE
// delete appointment - DONE
