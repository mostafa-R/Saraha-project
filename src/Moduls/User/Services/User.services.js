import User from "../../../DB/Models/User.model.js";
import { paginate } from "../../../utils/pagination.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select(
      "-password -__v -otp -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const users = await paginate(
      User,
      {},
      {
        page,
        limit,
        select: "-password -__v -otp -createdAt -updatedAt",
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
