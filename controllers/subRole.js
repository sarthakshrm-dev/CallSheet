const SubRole = require("../models/subRole");

//Create a subRole
exports.createSubRole = async (req, res) => {
  try {
    const subRole = new SubRole(req.body);
    await subRole.save();

    if (!subRole) {
      return res.json({
        success: false,
        error: "SubRole not found!",
      });
    }
    res.json({
      success: true,
      message: "SubRole created successfully",
      subRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//deleting an subRole
exports.deleteSubRole = async (req, res) => {
  const subRoleId = req.params.id;

  try {
    const subRole = await SubRole.deleteOne({ _id: subRoleId });
    res.json({
      success: true,
      message: "SubRole deleted successfully",
      subRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all SubRoles

exports.getAllSubRoles = async (req, res) => {
  try {
    const subRoles = await SubRole.find({});
    return res.status(200).json({
      success: true,
      subRoles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSubRolesByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;

    const subRoles = await SubRole.find({ role: roleId });
    return res.status(200).json({
      success: true,
      subRoles,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
