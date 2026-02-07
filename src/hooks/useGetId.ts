import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id?: string;
  sub?: string;
  userId?: string;
  email?: string;
  role?: string;
  exp?: number;
};

export const getUser = async () => {
  
  const token = localStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid JWT token");
    return null;
  }
};
