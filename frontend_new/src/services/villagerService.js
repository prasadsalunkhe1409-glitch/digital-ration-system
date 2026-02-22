import axiosInstance from "../utils/axios";

// Get villager dashboard data
export const getVillagerDashboard = async () => {
  const response = await axiosInstance.get("/villager/dashboard");
  return response.data;
};
