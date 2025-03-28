import { LoginFormData } from "@/types/LoginFormData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
