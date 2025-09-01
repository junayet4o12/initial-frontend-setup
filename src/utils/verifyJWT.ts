import { jwtDecode } from "jwt-decode";

export const verifyJWT = (token: string) => {
  const decoded = jwtDecode(token);

  return decoded;
};
