const mongoose = require("mongoose");

const subRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubRole", subRoleSchema);
