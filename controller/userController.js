const {
  validateAsync,
  userLoginSchema,
  userRegisterSchema,
} = require("../constants/Validations");
const Users = require("../models/Users");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    await validateAsync(userLoginSchema, { email, password });
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });
    if (user.password !== password)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect!" });
    const { _id, username: name, email: userEmail } = user.toObject();
    res.status(200).json({ _id, username: name, email: userEmail });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await validateAsync(userRegisterSchema, { username, email, password });
    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ message: "This email is already exists!" });
    const newUser = new Users({ username, email, password });
    await newUser.save();
    res.status(200).json({ _id: newUser._id, username, email });
  } catch (error) {
    if (error?.code === 11000)
      return res.status(400).json({
        message: "This username is already exists!",
      });
    res.status(400).json(error);
  }
};

module.exports = {
  userLogin,
  userRegister,
};
