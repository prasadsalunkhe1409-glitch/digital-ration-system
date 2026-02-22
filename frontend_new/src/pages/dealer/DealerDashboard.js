import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { getDealerDashboard } from "../../services/dealerService";
import "../../styles/dealer.css";
import Footer from "../../components/Footer";

const DealerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await getDealerDashboard();

      console.log("Dashboard Response:", response);

      setData(response);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    // ✅ Auto refresh every 3 seconds
    const interval = setInterval(() => {
      loadDashboard();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Dealer Dashboard</h1>

        {/* ✅ Footer added */}
        <Footer />
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Dealer Info */}
            <div className="dealer-info">
              <p>
                <strong>Name:</strong> {data?.dealer?.name || "Not available"}
              </p>

              <p>
                <strong>Email:</strong> {data?.dealer?.email || "Not available"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="card-grid">
              <StatCard
                title="Total Distributions"
                value={data?.stats?.totalDistributions || 0}
              />

              <StatCard
                title="Today's Distributions"
                value={data?.stats?.todayDistributions || 0}
              />

              <StatCard
                title="This Month"
                value={data?.stats?.monthlyDistributions || 0}
              />

              <StatCard
                title="Villagers Served"
                value={data?.stats?.villagersServed || 0}
              />
            </div>

            {/* Stock Summary */}
            <h2>Stock Summary</h2>

            <div className="card-grid">
              {data?.stock?.length > 0 ? (
                data.stock.map((item) => (
                  <div key={item._id} className="stat-card">
                    <h3>{item.name}</h3>

                    <h2>
                      {item.stock} {item.unit}
                    </h2>
                  </div>
                ))
              ) : (
                <p>No stock available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
};

export default DealerDashboard;
