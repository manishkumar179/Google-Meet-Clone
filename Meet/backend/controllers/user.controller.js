const UserModel = require("../models/user.model")

 const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User does not found",
      });
    }

    return res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to get Current user`,
    });
  }
};


module.exports = getCurrentUser