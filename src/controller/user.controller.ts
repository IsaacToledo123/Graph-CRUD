import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const TOKEN_SECRET: string = process.env.TOKEN_SECRET!;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    res.header("auth-token", token).json({
      token,
      message: "User logged in successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (input: any) => {
  const { name, email, password } = input;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error: any) {
    return { message: error.message };
  }
};

const readAll = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error: any) {
    return { message: error.message };
  }
};

const readById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error: any) {
    return { message: error.message };
  }
};

const updateById = async (input: any) => {
  const { email, oldPassword, newPassword } = input;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found" };
    }
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return { message: "Invalid password" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.findByIdAndUpdate(user._id, {password: hashedPassword}, {new: true})
    return updatedUser;
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message };
  }
};

const deleteById = async (id: string) => {
  try {
    await User.findByIdAndDelete(id);
    return { message: "User deleted successfully" };
  } catch (error: any) {
    return { message: error.message };
  }
};

export default {
  authUser,
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};
