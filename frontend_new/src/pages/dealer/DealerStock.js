import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Sidebar from "../../layout/Sidebar";
import "../../styles/dealer.css";
import "./DealerStock.css";
import Footer from "../../components/Footer";

const DealerStock = () => {
  const [stock, setStock] = useState([]);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Dealer Stock
  // ===============================
  const fetchStock = async () => {
    try {
      const res = await api.get("/dealer/stock");

      setStock(res.data.stock || []);
    } catch (error) {
      console.error("Stock fetch error:", error);

      alert("Failed to load stock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();

    // ✅ Auto refresh every 3 seconds
    const interval = setInterval(() => {
      fetchStock();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Available Stock</h1>

        {loading ? (
          <p>Loading stock...</p>
        ) : stock.length === 0 ? (
          <p>No stock available</p>
        ) : (
          <div className="card-grid">
            {stock.map((item) => (
              <div key={item._id} className="stat-card">
                <h3>{item.name}</h3>

                <h2>
                  {item.stock} {item.unit}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DealerStock;
