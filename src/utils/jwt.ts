// src/utils/jwt.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../configs/config";

const JWT_SECRET = config.jwt.secret || "fallback_secret_key";
const JWT_EXPIRES = (config.jwt.expiresIn || "1h") as SignOptions["expiresIn"];
console.log("JWT_EXPIRES:", JWT_EXPIRES);
export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as JwtPayload;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
};