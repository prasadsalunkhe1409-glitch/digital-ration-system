import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import { createDistribution } from "../../services/dealerService";
import "../../styles/dealer.css";
import Footer from "../../components/Footer";

const DealerDistribution = () => {
  const navigate = useNavigate();

  const [rationCardNumber, setRationCardNumber] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDistribute = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await createDistribution({
        rationCardNumber,
        month,
        year,
      });

      setMessage(response.message);

      // ✅ redirect after success
      if (response.message === "Ration distributed successfully") {
        setTimeout(() => {
          navigate("/dealer/dashboard");
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Distribution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <div className="form-card">
          <h2>Distribute Ration</h2>

          <input
            type="text"
            placeholder="Ration Card Number"
            value={rationCardNumber}
            onChange={(e) => setRationCardNumber(e.target.value)}
          />

          <input
            type="number"
            value={month}
            min="1"
            max="12"
            onChange={(e) => setMonth(Number(e.target.value))}
          />

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />

          <button onClick={handleDistribute} disabled={loading}>
            {loading ? "Distributing..." : "Distribute"}
          </button>

          {message && <p className="success">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealerDistribution;
