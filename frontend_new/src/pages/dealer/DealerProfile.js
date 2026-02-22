import { useEffect, useState } from "react";
import api from "../../utils/axios"; 
import Sidebar from "../../layout/Sidebar";
import "./DealerProfile.css";
import Footer from "../../components/Footer";

const DealerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Profile
  // ===============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/dealer/profile"); 

        setProfile(res.data.dealer || { name: "", email: "" });
      } catch (error) {
        console.error("Profile fetch error:", error);

        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ===============================
  // Update Profile
  // ===============================
  const updateProfile = async () => {
    try {
      await api.put("/dealer/profile", profile);

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error);

      alert("Failed to update profile");
    }
  };

  // ===============================
  // Change Password
  // ===============================
  const changePassword = async () => {
    try {
      await api.put("/dealer/change-password", password);

      alert("Password changed successfully");

      setPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);

      alert("Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="layout">
        <Sidebar role="dealer" />
        <div className="content">
          <h2>Loading profile...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar role="dealer" />

      <div className="content">
        <h1>Dealer Profile</h1>

        <div className="profile-card">
          <h3>Update Profile</h3>

          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <button onClick={updateProfile}>Update Profile</button>
        </div>

        <div className="profile-card">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Current Password"
            value={password.currentPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                currentPassword: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                newPassword: e.target.value,
              })
            }
          />

          <button onClick={changePassword}>Change Password</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DealerProfile;
