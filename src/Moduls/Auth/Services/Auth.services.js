///logic
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import User from "../../../DB/Models/User.model.js";
import { generateToken } from "../../../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      confirmPassword,
      phone,
      age,
      role,
      gender,
      bio,
      profileImg,
    } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const user = await new User({
      userName,
      email,
      password,
      phone,
      age,
      role,
      gender,
      bio: bio || "",
      profileImg: profileImg || "",
    });

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(404).json({ message: "invalid password or Email" });
    }

    const decryptedPhone = CryptoJS.AES.decrypt(
      user.phone,
      process.env.ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);

    const decryptedEmail = CryptoJS.AES.decrypt(
      user.email,
      process.env.ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);

    user.phone = decryptedPhone;
    user.email = decryptedEmail;

    const token = generateToken(user, res);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};
