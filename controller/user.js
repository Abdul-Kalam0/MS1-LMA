const { User } = require("../models");

const addUser = async (req, res) => {
  const { email, username } = req.body;

  try {
    if (!email || !username) {
      return res
        .status(401)
        .json({ message: "Please enter username and email" });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist. Use another email account" });
    }

    const newUser = await User.create({
      username,
      email,
    });

    res
      .status(200)
      .json({ message: `User created successfully`, user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching the data", error: error.message });
  }
};

module.exports = { addUser };
