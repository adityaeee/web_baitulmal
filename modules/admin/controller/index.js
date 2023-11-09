const { Admin } = require("../../../models");

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {};

module.exports = { getAdmin, createAdmin };
