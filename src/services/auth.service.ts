import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const registerUser = async (username: string, password: string, role: string = "user") => {
  const existingUser = await User.findOne({ username });

  if (existingUser) throw new AppError("Username already exists",400);

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
  if (!user) throw new AppError("Account does not exist");


  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Username or password is incorrect");

  const token = signToken({
    sub: user._id.toString(),
    role: user.role,
  });
  return token;
};
