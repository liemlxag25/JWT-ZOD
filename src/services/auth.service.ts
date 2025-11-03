import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { signToken } from "../utils/jwt";

export const registerUser = async (username: string, password: string, role: string = "user") => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Tên đăng nhập đã tồn tại");

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
  if (!user) throw new Error("Tài khoản không tồn tại");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Mật khẩu không chính xác");

  const token = signToken({ id: user._id, username: user.username });
  return token;
};
