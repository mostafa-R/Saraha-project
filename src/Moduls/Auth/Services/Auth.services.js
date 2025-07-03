///logic
import User from "../../../DB/Models/User.model.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password, phone, age, role } = req.body;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    const user = await User.create({
      userName,
      email,
      password,
      phone,
      age,
      role,
    });

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

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};
