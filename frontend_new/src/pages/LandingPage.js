import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Digital Ration Distribution System Maharashtra</title>

        <meta
          name="description"
          content="Digital Ration Distribution System for Maharashtra Public Distribution Portal. Manage ration stock, dealers, and villagers securely."
        />
      </Helmet>

      <div className="landing-container">
        <header className="landing-header">
          <h1>Digital Ration Distribution System</h1>
          <p>Maharashtra Public Distribution Portal</p>

          <button className="login-btn" onClick={() => navigate("/login")}>
            Login to System
          </button>
        </header>

        <section className="features">
          <h2>System Features</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Admin Management</h3>
              <p>Manage stock, dealers and distribution efficiently.</p>
            </div>

            <div className="feature-card">
              <h3>Dealer Panel</h3>
              <p>Distribute ration and track stock levels.</p>
            </div>

            <div className="feature-card">
              <h3>Villager Access</h3>
              <p>View ration history and distribution details.</p>
            </div>

            <div className="feature-card">
              <h3>Secure System</h3>
              <p>Role-based authentication and secure access.</p>
            </div>
          </div>
        </section>

        <footer className="landing-footer">Made by Prasad ❤️</footer>
      </div>
    </>
  );
};

export default LandingPage;
