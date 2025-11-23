import instance from "./axios";

export const sendRefreshToken = async () => {
  try {
    const res = await instance.post(
      "auth/refresh-token",
      {},
      { withCredentials: true }
    );

    if (res.status === 401) {
      localStorage.removeItem("auth");
      sessionStorage.removeItem("access_token");
      return null;
    }
    const accessToken = res.data.accessToken;
    sessionStorage.setItem("access_token", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("auth");
    sessionStorage.removeItem("access_token");
    return null;
  }
};

export const getAuth = () => {
  const storedUser = localStorage.getItem("auth");
  return storedUser ? JSON.parse(storedUser) : null;
};
