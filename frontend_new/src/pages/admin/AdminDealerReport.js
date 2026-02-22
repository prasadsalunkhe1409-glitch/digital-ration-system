import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import { getAdminDealerReport } from "../../services/adminService";
import "./AdminReports.css";

const AdminDealerReport = () => {
  const [dealerId, setDealerId] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await getAdminDealerReport(dealerId);
      setData(response);
    } catch (error) {
      console.error("Dealer Report Error:", error);
      alert("Failed to fetch dealer report");
    }
  };

  return (
    <div className="report-container">
      <Sidebar role="admin" />

      <div className="report-content">
        <h1 className="report-title">Admin Dealer Wise Report</h1>

        <div className="report-controls">
          <input
            type="text"
            placeholder="Enter Dealer ID"
            value={dealerId}
            onChange={(e) => setDealerId(e.target.value)}
            className="report-input"
          />
          <button onClick={handleFetch} className="report-button">
            Fetch
          </button>
        </div>

        {data && (
          <>
            <h3 className="report-total">
              Total Distributions: {data.totalDistributions}
            </h3>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Ration Card</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.month}</td>
                    <td>{record.rationCard?.cardNumber}</td>
                    <td>
                      {new Date(record.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {/* ✅ Footer added here */}
      <Footer />
    </div>
  );
};

export default AdminDealerReport;
