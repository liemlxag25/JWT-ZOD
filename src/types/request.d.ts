import { JwtUserPayload } from "./jwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
    }
  }
}

export {};
