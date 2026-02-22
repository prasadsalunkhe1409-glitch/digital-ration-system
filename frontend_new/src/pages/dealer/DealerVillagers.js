import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import "./DealerVillagers.css";

const DealerVillagers = () => {
  const [villagers, setVillagers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch assigned villagers
  // ===============================
  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        const response = await api.get("/dealer/villagers");

        setVillagers(response.data.villagers || []);
      } catch (error) {
        console.error("Error fetching villagers:", error);

        alert("Failed to load villagers");
      } finally {
        setLoading(false);
      }
    };

    fetchVillagers();
  }, []);

  // ===============================
  // Category Badge
  // ===============================
  const getCategoryBadge = (category) => {
    switch (category) {
      case "BPL":
        return "badge badge-bpl";

      case "APL":
        return "badge badge-apl";

      case "Antyodaya":
        return "badge badge-antyodaya";

      default:
        return "badge badge-secondary";
    }
  };

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <div className="dealer-villagers-container">
          <div className="dealer-card">
            <h2 className="dealer-title">Assigned Villagers</h2>

            {loading ? (
              <h4 className="text-center">Loading villagers...</h4>
            ) : villagers.length === 0 ? (
              <div className="no-villagers">
                No villagers assigned to this dealer.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table dealer-table">
                  <thead>
                    <tr>
                      <th>Card No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Category</th>
                      <th>Rice (kg)</th>
                      <th>Wheat (kg)</th>
                      <th>Sugar (kg)</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {villagers.map((v) => (
                      <tr key={v._id}>
                        <td>{v.cardNumber}</td>

                        <td>{v.user?.name || "N/A"}</td>

                        <td>{v.user?.email || "N/A"}</td>

                        <td>
                          <span className={getCategoryBadge(v.category)}>
                            {v.category}
                          </span>
                        </td>

                        <td>{v.monthlyQuota?.rice || 0}</td>

                        <td>{v.monthlyQuota?.wheat || 0}</td>

                        <td>{v.monthlyQuota?.sugar || 0}</td>

                        <td>
                          <button className="distribute-btn">Distribute</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DealerVillagers;
