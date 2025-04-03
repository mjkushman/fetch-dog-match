import { ReactNode, useEffect, useState } from "react";
import Login from "@/components/Login";
import authenticate from "@/api/authenticate";
import { LoginFormData } from "@/types/LoginFormData";
import Loading from "@/components/Loading";
import BASE_URL from "@/api/baseUrl";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const doLogin = async (loginFormData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authenticate(loginFormData);
      setIsAuthenticated(response);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const url = new URL("/dogs/breeds/", BASE_URL);
    fetch(url, { credentials: "include" })
      .then((res) => {
        if (res.status === 401) throw new Error(res.statusText);
        return res.ok;
      })
      .then((res) => setIsAuthenticated(res))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  if (!isAuthenticated && !isLoading) return <Login doLogin={doLogin} />;
  return <div>{children}</div>;
}
