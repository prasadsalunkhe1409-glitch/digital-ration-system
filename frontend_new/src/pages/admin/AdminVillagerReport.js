import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import { getAdminVillagerReport } from "../../services/adminService";
import "./AdminReports.css";

const AdminVillagerReport = () => {
  const [villagerId, setVillagerId] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await getAdminVillagerReport(villagerId);
      setData(response);
    } catch (error) {
      console.error("Villager Report Error:", error);
      alert("Failed to fetch villager report");
    }
  };

  return (
    <div className="report-container">
      <Sidebar role="admin" />

      <div className="report-content">
        <h1 className="report-title">Admin Villager Wise Report</h1>

        <div className="report-controls">
          <input
            type="text"
            placeholder="Enter Villager ID"
            value={villagerId}
            onChange={(e) => setVillagerId(e.target.value)}
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
                  <th>Dealer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.month}</td>
                    <td>{record.rationCard?.cardNumber}</td>
                    <td>{record.dealer?.name}</td>
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
      <Footer />
    </div>
  );
};

export default AdminVillagerReport;
