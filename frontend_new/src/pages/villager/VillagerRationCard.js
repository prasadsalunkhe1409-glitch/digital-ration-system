import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Sidebar from "../../layout/Sidebar";
import "./VillagerRationCard.css";
import Footer from "../../components/Footer";

const VillagerRationCard = () => {
  const [card, setCard] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch ration card
  // ===============================
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get("/villager/ration-card");

        setCard(res.data.rationCard);
      } catch (error) {
        console.error("Fetch ration card error:", error);

        alert("Failed to load ration card");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  // ===============================
  // Loading state
  // ===============================
  if (loading)
    return (
      <div className="layout">
        <Sidebar role="villager" />

        <div className="content">
          <h2>Loading ration card...</h2>
        </div>
      </div>
    );

  // ===============================
  // No card found
  // ===============================
  if (!card)
    return (
      <div className="layout">
        <Sidebar role="villager" />

        <div className="content">
          <h2>No ration card found</h2>
        </div>
      </div>
    );

  // ===============================
  // Show card
  // ===============================
  return (
    <div className="layout">
      <Sidebar role="villager" />

      <div className="content">
        <h1>My Ration Card</h1>

        <div className="ration-card">
          <p>
            <strong>Card Number:</strong> {card.cardNumber}
          </p>

          <p>
            <strong>Category:</strong> {card.category}
          </p>

          <p>
            <strong>Family Members:</strong> {card.familyMembers}
          </p>

          <p>
            <strong>Dealer Name:</strong> {card.dealer?.name || "N/A"}
          </p>

          <p>
            <strong>Dealer Email:</strong> {card.dealer?.email || "N/A"}
          </p>

          <hr />

          <h3>Monthly Quota</h3>

          <p>Rice: {card.monthlyQuota?.rice || 0} kg</p>

          <p>Wheat: {card.monthlyQuota?.wheat || 0} kg</p>

          <p>Sugar: {card.monthlyQuota?.sugar || 0} kg</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VillagerRationCard;
