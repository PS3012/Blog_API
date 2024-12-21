import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";
import User from "../../models/user.model.js";
import { emailRegex } from "../../utils/constants.js";

const handleUserLogin = async (req, res) => {
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

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User with this email does not exist.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      error: false,
      message: "User logged in successfully!",
      data: { email, token },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUserLogin;
