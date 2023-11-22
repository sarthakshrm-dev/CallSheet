const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/appointment", require("./appointment"));
router.use("/chat", require("./chat"));
router.use("/user", require("./user"));
router.use("/role", require("./role"));
router.use("/subRole", require("./subRole"));
router.use("/admin", require("./admin"));

module.exports = router;
