import User from "../models/user.model.js";
import { getPredictedAge } from "../services/age.service.js";
import { generateUserPDF } from "../services/pdf.service.js";

export const createUser = async (req, res) => {
  try {
    const { fullName } = req.body;

    const predictedAge = await getPredictedAge(fullName);

    const user = new User({
      ...req.body,
      age: predictedAge,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

export const downloadUserPDF = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fileName = await generateUserPDF(user);
    res.download(`./uploads/${fileName}`);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating PDF", error: err.message });
  }
};
