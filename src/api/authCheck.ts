const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/** GET request to check if user is authenticated */
const authCheck = async (): Promise<boolean> => {
  const url = new URL("dogs/search", BASE_URL);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.ok;
};

export default authCheck;
