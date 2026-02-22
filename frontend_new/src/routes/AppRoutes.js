// src/routes/AppRoutes.js

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";

// ✅ IMPORT LANDING PAGE (NEW)
import LandingPage from "../pages/LandingPage";

// ================= ADMIN =================
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminMonthlyReport from "../pages/admin/AdminMonthlyReport";
import AdminYearlyReport from "../pages/admin/AdminYearlyReport";
import AdminDealerReport from "../pages/admin/AdminDealerReport";
import AdminVillagerReport from "../pages/admin/AdminVillagerReport";
import AdminStockRequests from "../pages/admin/AdminStockRequests";
import AdminProfile from "../pages/admin/AdminProfile";

// ================= DEALER =================
import DealerDashboard from "../pages/dealer/DealerDashboard";
import DealerDistribution from "../pages/dealer/DealerDistribution";
import DealerMonthlyReport from "../pages/dealer/DealerMonthlyReport";
import DealerVillagers from "../pages/dealer/DealerVillagers";
import DealerHistory from "../pages/dealer/DealerHistory";
import DealerStock from "../pages/dealer/DealerStock";
import DealerRequests from "../pages/dealer/DealerRequests";
import DealerProfile from "../pages/dealer/DealerProfile";

// ================= VILLAGER =================
import VillagerDashboard from "../pages/villager/VillagerDashboard";
import RationHistory from "../pages/villager/RationHistory";
import VillagerRationCard from "../pages/villager/VillagerRationCard";
import VillagerProfile from "../pages/villager/VillagerProfile";
import VillagerNotifications from "../pages/villager/VillagerNotifications";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ SEO LANDING PAGE (NEW DEFAULT PAGE) */}
      <Route path="/" element={<LandingPage />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports/monthly"
        element={
          <ProtectedRoute role="admin">
            <AdminMonthlyReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports/yearly"
        element={
          <ProtectedRoute role="admin">
            <AdminYearlyReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports/dealer"
        element={
          <ProtectedRoute role="admin">
            <AdminDealerReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports/villager"
        element={
          <ProtectedRoute role="admin">
            <AdminVillagerReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stock-requests"
        element={
          <ProtectedRoute role="admin">
            <AdminStockRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute role="admin">
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= DEALER ROUTES ================= */}

      <Route
        path="/dealer/dashboard"
        element={
          <ProtectedRoute role="dealer">
            <DealerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/distribute"
        element={
          <ProtectedRoute role="dealer">
            <DealerDistribution />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/monthly-report"
        element={
          <ProtectedRoute role="dealer">
            <DealerMonthlyReport />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/villagers"
        element={
          <ProtectedRoute role="dealer">
            <DealerVillagers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/history"
        element={
          <ProtectedRoute role="dealer">
            <DealerHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/stock"
        element={
          <ProtectedRoute role="dealer">
            <DealerStock />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/requests"
        element={
          <ProtectedRoute role="dealer">
            <DealerRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer/profile"
        element={
          <ProtectedRoute role="dealer">
            <DealerProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= VILLAGER ROUTES ================= */}

      <Route
        path="/villager/dashboard"
        element={
          <ProtectedRoute role="villager">
            <VillagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/villager/history"
        element={
          <ProtectedRoute role="villager">
            <RationHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/villager/profile"
        element={
          <ProtectedRoute role="villager">
            <VillagerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/villager/ration-card"
        element={
          <ProtectedRoute role="villager">
            <VillagerRationCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/villager/notifications"
        element={
          <ProtectedRoute role="villager">
            <VillagerNotifications />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK ROUTE */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;