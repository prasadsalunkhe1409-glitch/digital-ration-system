import { useEffect, useState } from "react";
import api from "../../utils/axios"; 
import Sidebar from "../../layout/Sidebar";
import "./VillagerNotifications.css";
import Footer from "../../components/Footer";

const VillagerNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Notifications
  // ===============================
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/villager/notifications");

        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Notification fetch error:", error);

        alert("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="layout">
      <Sidebar role="villager" />

      <div className="content">
        <h1>Notifications</h1>

        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <div className="notification-container">
            {notifications.map((n) => (
              <div key={n._id} className="notification-card">
                <h3>Ration Received</h3>

                <p>Dealer: {n.dealer?.name || "N/A"}</p>

                <p>
                  Month: {n.month} / {n.year}
                </p>

                <p>Date: {new Date(n.createdAt).toLocaleDateString()}</p>

                <div className="items">
                  {n.items?.map((item, index) => (
                    <p key={index}>
                      {item.name}: {item.quantity} kg
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default VillagerNotifications;
