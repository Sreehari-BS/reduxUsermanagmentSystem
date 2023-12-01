import asyncHandler from "express-async-handler";
import { generateAdminToken } from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const saveAdminData = asyncHandler(async (email, password) => {
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return;
    }
    const admin = await Admin.create({
      email: email,
      password: password,
    });
  } catch (error) {
    console.error("Error saving admin data:", error);
    throw new Error("Unable to save admin data");
  }
});

saveAdminData(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && admin.password === password) {
    generateAdminToken(res, admin._id);
    res.status(200).json({
      _id: admin.id,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const listUserData = asyncHandler(async (req, res) => {
  const userData = await User.find();

  res.status(200).json(userData);
});

const createUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ phone }, { email }] });

  if (existingUser) {
    res.status(400);
    throw new Error("User alreay Exists");
  }

  const user = await User.create({
    name,
    phone,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      phone: user.phone,
      name: user.name,
      email: user.email,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id, ...rest } = req.body;
  const user = await User.findById(_id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id });

  res.status(200).json({ message: "User deleted successfully" });
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("adminJWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Admin Logged Out" });
});

export {
  authAdmin,
  logoutAdmin,
  listUserData,
  createUser,
  updateUser,
  deleteUser,
};
