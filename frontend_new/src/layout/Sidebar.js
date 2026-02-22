import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ role }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>
        {role === "admin" && "Admin Panel"}
        {role === "dealer" && "Dealer Panel"}
        {role === "villager" && "Villager Panel"}
      </h3>

      {/* ================= ADMIN LINKS ================= */}
      {role === "admin" && (
        <>
          <Link to="/admin/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/admin/reports/monthly" style={styles.link}>
            Monthly Report
          </Link>
          <Link to="/admin/reports/yearly" style={styles.link}>
            Yearly Report
          </Link>
          <Link to="/admin/reports/dealer" style={styles.link}>
            Dealer Report
          </Link>
          <Link to="/admin/reports/villager" style={styles.link}>
            Villager Report
          </Link>
          <Link to="/admin/stock-requests" style={styles.link}>
            Stock Requests
          </Link>
          <Link to="/admin/profile" style={styles.link}>
            Profile
          </Link>
        </>
      )}

      {/* ================= DEALER LINKS ================= */}
      {role === "dealer" && (
        <>
          <Link to="/dealer/dashboard" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/dealer/distribute" style={styles.link}>
            Distribute Ration
          </Link>

          <Link to="/dealer/monthly-report" style={styles.link}>
            Monthly Report
          </Link>

          <Link to="/dealer/villagers" style={styles.link}>
            Manage Villagers
          </Link>

          <Link to="/dealer/history" style={styles.link}>
            Distribution History
          </Link>

          <Link to="/dealer/stock" style={styles.link}>
            View Stock
          </Link>

          <Link to="/dealer/requests" style={styles.link}>
            Stock Requests
          </Link>

          <Link to="/dealer/profile" style={styles.link}>
            Profile
          </Link>
        </>
      )}

      {/* ================= VILLAGER LINKS ================= */}
      {role === "villager" && (
        <>
          <Link to="/villager/dashboard" style={styles.link}>
            Dashboard
          </Link>
          <Link to="/villager/history" style={styles.link}>
            Ration History
          </Link>
          <Link to="/villager/ration-card" style={styles.link}>
            My Ration Card
          </Link>
          <Link to="/villager/notifications" style={styles.link}>
            Notifications
          </Link>
          <Link to="/villager/profile" style={styles.link}>
            Profile
          </Link>
        </>
      )}

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    marginBottom: "12px",
  },
  logout: {
    marginTop: "20px",
    padding: "8px",
    width: "100%",
    cursor: "pointer",
  },
};

export default Sidebar;
