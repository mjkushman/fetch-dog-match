import { LoginFormData } from "@/types/LoginFormData";
import BASE_URL from "./baseUrl";

const authenticate = async ({ name, email }: LoginFormData) => {
  const url = new URL("auth/login", BASE_URL);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });
  return response.ok;
};

export default authenticate;
