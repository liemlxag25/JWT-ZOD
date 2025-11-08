import { JwtUserPayload } from "./jwtPayload";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: JwtUserPayload;
  }
}
