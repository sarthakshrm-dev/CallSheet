const Role = require("../models/role");

//Create a role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    if (!role) {
      return res.json({
        success: false,
        error: "Role not found!",
      });
    }
    res.json({
      success: true,
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//deleting an role
exports.deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    const role = await Role.deleteOne({ _id: roleId });
    res.json({
      success: true,
      message: "Role deleted successfully",
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all Roles

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});

    let data = []

    roles.forEach((x) => {
      if(x.name!=='admin') {
        data.push(x)
      }
    })

    return res.status(200).json({
      success: true,
      roles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
