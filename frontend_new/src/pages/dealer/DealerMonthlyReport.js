import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { getDealerMonthlyReport } from "../../services/dealerService";
import "../../styles/dealer.css";
import Footer from "../../components/Footer";

const DealerMonthlyReport = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await getDealerMonthlyReport(month, year);

      setTotal(response.totalDistributions || response.total || 0);
      setRecords(response.records || response.distributions || []);
      setSearched(true);
    } catch (error) {
      setTotal(0);
      setRecords([]);
      setSearched(true);
    }
  };

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Dealer Monthly Report</h1>

        <div className="filter-section">
          <input
            type="number"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {searched && (
          <>
            <h3>Total Distributions: {total}</h3>

            {records.length === 0 ? (
              <p>No records found</p>
            ) : (
              <div className="report-grid">
                {records.map((record) => (
                  <div key={record._id} className="report-card">
                    <h4>Ration Card: {record.rationCard?.cardNumber}</h4>
                    <p>Month: {record.month}</p>
                    <p>Year: {record.year}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DealerMonthlyReport;
