import { hash, compare } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { ProductCartType } from "@/types/products.type";
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
  if (!process?.env?.RefreshTokenSecreKey) return null;

  const token = sign({ ...data }, process.env.RefreshTokenSecreKey, {
    expiresIn: "15d",
  });
  return token;
};
const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_TOKEN_SECRET_KEY;
const encryptData = (data: any) => {
  try {
    if (!secretKey) return null;
    const strigifiedData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(
      strigifiedData,
      secretKey
    ).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};
const decryptData = (token: string): ProductCartType[] | null => {
  try {
    if (!secretKey) return null;

    const bytes = CryptoJS.AES.decrypt(token, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData) as ProductCartType[];
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
};
export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  decryptData,
  encryptData,
  generateRefreshToken,
};
