import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Sidebar from "../../layout/Sidebar";
import "../../styles/dealer.css";
import "./DealerRequests.css";
import Footer from "../../components/Footer";

const DealerRequests = () => {
  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);

  // ===============================
  // Fetch existing requests
  // ===============================
  const fetchRequests = async () => {
    try {
      const res = await api.get("/dealer/requests");

      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Fetch Requests Error:", error);

      alert("Failed to load requests");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ===============================
  // Handle input change
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // Submit new request
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/dealer/requests", form);

      alert("Request sent successfully");

      setForm({
        itemName: "",
        quantity: "",
      });

      fetchRequests();
    } catch (error) {
      console.error("Request Error:", error);

      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Badge color
  // ===============================
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge pending";

      case "Approved":
        return "badge approved";

      case "Rejected":
        return "badge rejected";

      default:
        return "badge";
    }
  };

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Stock Requests</h1>

        {/* ================= FORM ================= */}

        <div className="form-card">
          <h3>Request Stock</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name (Rice/Wheat/Sugar)"
              value={form.itemName}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>

        {/* ================= REQUEST TABLE ================= */}

        <div className="table-card">
          <h3>My Requests</h3>

          {fetchLoading ? (
            <p>Loading requests...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="4">No requests found</td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.itemName}</td>

                      <td>{req.quantity}</td>

                      <td>
                        <span className={getStatusBadge(req.status)}>
                          {req.status}
                        </span>
                      </td>

                      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DealerRequests;
