const serviceAccount = require("../call-sheet-manager-firebase-adminsdk-mvgnf-a158ef4251.json"); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendNotification = async (req, res) => {
  try {
    const { token, title, body } = req.body;

    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Notification sent successfully:", response);
        res
          .status(200)
          .json({ message: "Notification sent successfully", data: response });
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error,
    });
  }
};
