const schedule = require("node-schedule");
const User = require("../models/user"); // Import your User model

const scheduleAccountDeletion = () => {
  schedule.scheduleJob("0 0 * * *", async () => {
    try {
      const deletionDate = new Date();
      deletionDate.setDate(deletionDate.getDate() - 90);

      // Find and delete user accounts where deleteRequestedAt is set and before deletionDate
      const usersToDelete = await User.find({
        deleteRequestedAt: { $exists: true },
        deleteRequestedAt: { $lt: deletionDate },
      });

      for (const user of usersToDelete) {
        await user.remove();
      }

      console.log("User accounts deleted successfully");
    } catch (error) {
      console.error("Error deleting user accounts:", error);
    }
  });
};

module.exports = scheduleAccountDeletion;
