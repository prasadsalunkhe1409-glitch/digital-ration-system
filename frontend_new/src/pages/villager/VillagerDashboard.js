import { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { getVillagerDashboard } from "../../services/villagerService";
import "./Villager.css";
import Footer from "../../components/Footer";

const VillagerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getVillagerDashboard();
        console.log("Villager Dashboard Response:", response);
        setData(response);
      } catch (error) {
        console.error("Villager dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading data</div>;

  const totalDistributions = data.distributions?.length || 0;

  return (
    <div className="pageContainer">
      <Sidebar role="villager" />

      <div className="content">
        <h1>Villager Dashboard</h1>

        <div className="cardGrid">
          <Card
            title="Ration Card"
            value={data.rationCard?.cardNumber || "-"}
          />
          <Card
            title="Category"
            value={data.rationCard?.category || "-"}
          />
          <Card
            title="Total Distributions"
            value={totalDistributions}
          />
        </div>

        <h2 style={{ marginTop: "40px" }}>Distribution History</h2>

        {totalDistributions === 0 ? (
          <p>No distributions yet</p>
        ) : (
          data.distributions.map((dist) => (
            <div key={dist._id} className="historyCard">
              <h4>
                {dist.month}/{dist.year}
              </h4>
              <p>Dealer: {dist.dealer?.name}</p>

              {dist.items?.map((item, index) => (
                <p key={index}>
                  {item.item?.name} - {item.quantity} {item.item?.unit}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
      <Footer/>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <h2>{value}</h2>
  </div>
);

export default VillagerDashboard;
