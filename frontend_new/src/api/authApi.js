import axiosInstance from "../utils/axios";

export const loginApi = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};
