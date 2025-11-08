import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/appError";

export const registerUser = async (username: string, password: string, role: string = "user") => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new AppError("Username already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    role,
  });

  return newUser;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new AppError("Account does not exist", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Account is incorrect", 400);

  const token = signToken({ id: String(user._id), username: user.username });
  return token;
};
