import { hash, compare } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface TokenPayLoad extends JwtPayload {
  email: string;
}

const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
};
const generateAccessToken = (data: any) => {
  if (!process?.env?.AccessTokenSecretKey) return null;

  const token = sign({ ...data }, process?.env?.AccessTokenSecretKey, {
    expiresIn: "12h",
  });

  return token;
};
const verifyAccessToken = (token: any) => {
  try {
    if (!process?.env?.AccessTokenSecretKey) return null;
    const tokenPayLoad = verify(
      token,
      process.env.AccessTokenSecretKey
    ) as TokenPayLoad;
    return tokenPayLoad;
  } catch (error) {
    console.log("Verify Access Token Error ->", error);
    return false;
  }
};

const generateRefreshToken = (data: any) => {
  if (!process?.env?.AccessTokenSecretKey) return null;

  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
};
