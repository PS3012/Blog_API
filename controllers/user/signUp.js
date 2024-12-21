import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";
import User from "../../models/user.model.js";
import { emailRegex } from "../../utils/constants.js";

const handleUserSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: true,
      message: "Incomplete details provided. Please fill all required fields.",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({
      error: true,
      message: "Invalid email format.",
    });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({
      error: true,
      message: "User with this email already exists.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      error: false,
      message: "User registered successfully!",
      data: { email, token },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUserSignUp;
