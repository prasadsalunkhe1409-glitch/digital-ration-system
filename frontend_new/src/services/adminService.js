import axiosInstance from "../utils/axios";

// ===============================
// Dashboard
// ===============================
export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("/admin/dashboard");
  return response.data;
};

// ===============================
// Monthly Report
// ===============================
export const getAdminMonthlyReport = async (month, year) => {
  const response = await axiosInstance.get(
    `/admin/reports/monthly?month=${month}&year=${year}`
  );
  return response.data;
};

// ===============================
// Yearly Report
// ===============================
export const getAdminYearlyReport = async (year) => {
  const response = await axiosInstance.get(
    `/admin/reports/yearly?year=${year}`
  );
  return response.data;
};

// ===============================
// Dealer Report
// ===============================
export const getAdminDealerReport = async (dealerId) => {
  const response = await axiosInstance.get(
    `/admin/reports/dealer/${dealerId}`
  );
  return response.data;
};

// ===============================
// Villager Report
// ===============================
export const getAdminVillagerReport = async (villagerId) => {
  const response = await axiosInstance.get(
    `/admin/reports/villager/${villagerId}`
  );
  return response.data;
};

// ===============================
// Stock Analytics
// ===============================
export const getStockAnalytics = async () => {
  const response = await axiosInstance.get("/admin/stock-analytics");
  return response.data;   // must return ARRAY
};
