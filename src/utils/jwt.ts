// src/utils/jwt.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../configs/config";
import { JwtUserPayload } from "../types/jwtPayload";

const JWT_SECRET = config.jwt.secret || "fallback_secret_key";
const JWT_EXPIRES = (config.jwt.expiresIn || "1h") as SignOptions["expiresIn"];

export const signToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): JwtUserPayload | null => {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as JwtUserPayload;  
};