import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import {
  getAdminDashboard,
  getStockAnalytics,
} from "../../services/adminService";
import "./AdminDashboard.css";
import { Helmet } from "react-helmet-async";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboardData = await getAdminDashboard();
        setData(dashboardData);

        const analyticsData = await getStockAnalytics();
        setAnalytics(analyticsData || []);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar role="admin" />
        <div className="dashboard-content">
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>Admin Dashboard | Digital Ration System</title>

      <meta
        name="description"
        content="Admin dashboard for managing ration distribution, stock, dealers and villagers."
      />
    </Helmet>
    <div className="dashboard-container">
      <Sidebar role="admin" />

      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>

        {data && (
          <>
            {/* 🔔 LOW STOCK ALERT */}
            {data.lowStockItems && data.lowStockItems.length > 0 && (
              <div className="low-stock-alert">
                <h3>⚠ Low Stock Alert</h3>
                {data.lowStockItems.map((item) => (
                  <p key={item._id}>
                    {item.name} is low (Only {item.stock} {item.unit} left)
                  </p>
                ))}
              </div>
            )}

            {/* SUMMARY CARDS */}
            <div className="card-grid">
              <Card title="Total Villagers" value={data.users.villagers} />
              <Card title="Total Dealers" value={data.users.dealers} />
              <Card title="Total Admins" value={data.users.admins} />
              <Card title="Total Ration Cards" value={data.rationCards} />
              <Card title="Total Ration Items" value={data.rationItems} />
              <Card title="Total Distributions" value={data.distributions} />
            </div>

            {/* STOCK SUMMARY */}
            <h2>Stock Summary</h2>
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {data.stockSummary.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td>{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 📊 STOCK ANALYTICS */}
            <h2>Stock Usage Analytics</h2>

            {analytics.length === 0 ? (
              <p>No distribution data available.</p>
            ) : (
              <Bar
                data={{
                  labels: analytics.map((item) => item.name),
                  datasets: [
                    {
                      label: "Total Distributed Quantity",
                      data: analytics.map((item) => item.totalQuantity),
                      backgroundColor: "#dfbb8a", // new color
                      borderColor: "#1e293b",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            )}
          </>
        )}
      </div>
      {/* ✅ Footer added here */}
      <Footer />
    </div>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="dashboard-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default AdminDashboard;
