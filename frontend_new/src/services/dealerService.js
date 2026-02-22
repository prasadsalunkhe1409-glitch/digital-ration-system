// dealerService.js

import axiosInstance from "../utils/axios";

// ======================================================
// 🚀 Dealer Dashboard
// ======================================================

export const getDealerDashboard = async () => {
  try {
    const response = await axiosInstance.get("/dealer/dashboard");

    return response.data;
  } catch (error) {
    console.error(
      "Dealer Dashboard Service Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ======================================================
// 🚚 Create Distribution
// ======================================================

export const createDistribution = async ({ rationCardNumber, month, year }) => {
  try {
    const response = await axiosInstance.post("/distributions", {
      rationCardNumber,
      month,
      year,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Create Distribution Service Error:",
      error.response?.data || error.message,
    );

    throw error.response?.data || error;
  }
};

// ======================================================
// ❌ DELETE Distribution (RESTORE STOCK)
// ======================================================

export const deleteDistribution = async (distributionId) => {
  try {
    const response = await axiosInstance.delete(
      `/distributions/${distributionId}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Distribution Service Error:",
      error.response?.data || error.message,
    );

    throw error.response?.data || error;
  }
};

// ======================================================
// 📅 Dealer Monthly Report
// ======================================================

export const getDealerMonthlyReport = async (month, year) => {
  try {
    const response = await axiosInstance.get(
      `/dealer/reports/monthly?month=${month}&year=${year}`,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Monthly Report Service Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};
