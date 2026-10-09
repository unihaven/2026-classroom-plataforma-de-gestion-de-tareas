import jwt from "jsonwebtoken";

export const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (payload) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Payload is required");
  }
  return jwt.sign(payload, secretKey, { expiresIn: "10d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

// Add a default export for backward compatibility with tests
export default {
  generateToken,
  verifyToken,
};
