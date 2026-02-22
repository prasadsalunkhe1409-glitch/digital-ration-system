import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../layout/Sidebar";
import "./VillagerRationCard.css";
import Footer from "../../components/Footer";

const VillagerRationCard = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/villager/ration-card",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCard(res.data.rationCard);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading)
    return (
      <div className="layout">
        <Sidebar role="villager" />
        <div className="content">
          <h2>Loading ration card...</h2>
        </div>
      </div>
    );

  if (!card)
    return (
      <div className="layout">
        <Sidebar role="villager" />
        <div className="content">
          <h2>No ration card found</h2>
        </div>
      </div>
    );

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
            <strong>Dealer Name:</strong> {card.dealer?.name}
          </p>

          <p>
            <strong>Dealer Email:</strong> {card.dealer?.email}
          </p>

          <hr />

          <h3>Monthly Quota</h3>

          <p>Rice: {card.monthlyQuota?.rice} kg</p>

          <p>Wheat: {card.monthlyQuota?.wheat} kg</p>

          <p>Sugar: {card.monthlyQuota?.sugar} kg</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VillagerRationCard;
