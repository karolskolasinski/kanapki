import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(payload: { uid: string; role: "user" | "admin" }) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // return jwt.sign(payload, JWT_SECRET, { expiresIn: "365d" });
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "60" });
}

export function verifyToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return null;
  }
}
