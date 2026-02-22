import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import api from "../../utils/axios";
import Footer from "../../components/Footer";

const RationHistory = () => {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Villager History
  // ===============================
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/villager/history");

        console.log("History Response:", res.data);

        setHistory(res.data.history || []);
      } catch (error) {
        console.error("History error:", error);

        alert("Failed to load ration history");

        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="layout">
      <Sidebar role="villager" />

      <div className="content">
        <h2>Ration History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No distributions yet</p>
        ) : (
          history.map((dist) => (
            <div key={dist._id} style={{ marginBottom: "15px" }}>
              <p>
                <strong>Month:</strong> {dist.month}
              </p>

              <p>
                <strong>Year:</strong> {dist.year}
              </p>

              <p>
                <strong>Dealer:</strong> {dist.dealer?.name || "N/A"}
              </p>

              <hr />
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RationHistory;
