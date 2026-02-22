import { useEffect, useState } from "react";
import api from "../../utils/axios"; // ✅ use custom axios instance
import Sidebar from "../../layout/Sidebar";
import "../../styles/dealer.css";
import "./DealerHistory.css";
import Footer from "../../components/Footer";

const DealerHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  // ======================================================
  // FETCH HISTORY
  // ======================================================

  const fetchHistory = async () => {
    try {
      const res = await api.get("/dealer/history"); // ✅ no localhost, no headers

      setHistory(res.data.history || []);
    } catch (error) {
      console.error("Fetch history error:", error);

      alert("Failed to load distribution history");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DELETE DISTRIBUTION
  // ======================================================

  const handleDelete = async (distributionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this distribution?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/distributions/${distributionId}`); // ✅ fixed

      alert("Distribution deleted and stock restored");

      fetchHistory(); // refresh
    } catch (error) {
      console.error("Delete error:", error);

      alert("Failed to delete distribution");
    }
  };

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Distribution History</h1>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No distributions yet</p>
        ) : (
          <table className="dealer-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Card No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Month</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                  <td>{item.rationCard?.cardNumber || "N/A"}</td>

                  <td>{item.rationCard?.user?.name || "N/A"}</td>

                  <td>{item.rationCard?.user?.email || "N/A"}</td>

                  <td>{item.month}</td>

                  <td>{item.year}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DealerHistory;
