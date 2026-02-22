import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer"; 
import { getAdminYearlyReport } from "../../services/adminService";
import "./AdminYearlyReport.css";

const AdminYearlyReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await getAdminYearlyReport(year);
      setData(response);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return (
    <div className="yearly-container">
      <Sidebar role="admin" />

      <div className="yearly-content">
        <h1 className="yearly-title">Admin Yearly Report</h1>

        {/* Filter */}
        <div className="yearly-filter">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />

          <button className="yearly-btn" onClick={handleFetch}>
            Fetch
          </button>
        </div>

        {data && (
          <>
            <p className="yearly-total">
              Total Distributions: {data.totalDistributions}
            </p>

            <table className="yearly-table">
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
                    <td>{monthNames[record.month - 1]}</td>
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

export default AdminYearlyReport;
