// src/types/jwtPayload.ts
export interface JwtUserPayload {
  id: string;
  username: string;
  role?: string;
}
