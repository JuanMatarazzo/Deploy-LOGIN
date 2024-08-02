const { User } = require("../db");
const { Op } = require("sequelize");

const getFilterOrSex = async (gender) => {
  if (gender) {
    const users = await User.findAll({
      where: {
        gender: gender,
      },
    });
    return users;
  }
};

const getFilterName = async (order) => {
  const users = await User.findAll({
    order: [["name", order]],
  });
  return users;
};
module.exports = {
  getFilterOrSex,
  getFilterName,
};
