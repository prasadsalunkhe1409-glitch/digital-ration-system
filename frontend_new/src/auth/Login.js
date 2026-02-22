import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", {
        role,
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      login(data);

      if (data.role === "admin") navigate("/admin/dashboard");
      else if (data.role === "dealer") navigate("/dealer/dashboard");
      else navigate("/villager/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Digital Ration System Maharashtra</title>
        <meta
          name="description"
          content="Login to Digital Ration Distribution System Maharashtra."
        />
      </Helmet>
      <div className="login-main-container">
        {/* Left Sidebar */}
        <div className="login-sidebar">
          <h3>Login Panel</h3>

          <button
            className={role === "admin" ? "active-role" : ""}
            onClick={() => setRole("admin")}
          >
            Admin Login
          </button>

          <button
            className={role === "dealer" ? "active-role" : ""}
            onClick={() => setRole("dealer")}
          >
            Dealer Login
          </button>

          <button
            className={role === "villager" ? "active-role" : ""}
            onClick={() => setRole("villager")}
          >
            Villager Login
          </button>
        </div>

        {/* Right Login Area */}
        <div className="login-content">
          <div className="premium-header">
            <h1>Digital Ration Distribution System Maharashtra</h1>
            <p>🏛️ Government Public Distribution Portal, Maharashtra State</p>
          </div>

          <div className="premium-login-card">
            <h2>{role.toUpperCase()} Login</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email Address"
                className="premium-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="premium-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="premium-button" disabled={loading}>
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>

            {error && <div className="premium-error">{error}</div>}
          </div>

          {/* ✅ Footer Text (Old Style) */}
          <div className="premium-footer">Made by Prasad ❤️</div>
        </div>
      </div>
    </>
  );
};

export default Login;
