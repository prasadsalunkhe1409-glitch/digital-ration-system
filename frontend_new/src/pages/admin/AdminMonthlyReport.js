import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer"; 
import { getAdminMonthlyReport } from "../../services/adminService";
import "./AdminMonthlyReport.css";

const AdminMonthlyReport = () => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await getAdminMonthlyReport(month, year);
      setData(response);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="report-container">
      <Sidebar role="admin" />

      <div className="report-content">
        <h1 className="report-title">Admin Monthly Report</h1>

        {/* Filter */}
        <div className="filter-section">
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />

          <button className="fetch-btn" onClick={handleFetch}>
            Fetch
          </button>
        </div>

        {data && (
          <>
            <p className="total-count">
              Total Distributions: {data.totalDistributions}
            </p>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Ration Card</th>
                  <th>Dealer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.records.map((record) => (
                  <tr key={record._id}>
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
      {/* ✅ Footer added here */}
      <Footer />
    </div>
  );
};

export default AdminMonthlyReport;
