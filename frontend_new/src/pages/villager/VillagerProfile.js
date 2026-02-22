import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../layout/Sidebar";
import "./VillagerProfile.css";
import Footer from "../../components/Footer";

const VillagerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/villager/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile({
        name: res.data.villager.name,
        email: res.data.villager.email
      });

    } catch (error) {
      console.error(error);
      setMessage("Error loading profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/villager/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message);

    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  // ================= CHANGE PASSWORD =================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/villager/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="layout">
      <Sidebar role="villager" />

      <div className="content">
        <h1>Villager Profile</h1>

        {message && (
          <div className="profile-message">
            {message}
          </div>
        )}

        {/* Profile Update */}
        <div className="profile-card">

          <h3>Update Profile</h3>

          <form onSubmit={handleProfileUpdate}>

            <label>Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
            />

            <button type="submit">
              Update Profile
            </button>

          </form>
        </div>

        {/* Change Password */}
        <div className="profile-card">

          <h3>Change Password</h3>

          <form onSubmit={handlePasswordChange}>

            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })
              }
              required
            />

            <label>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })
              }
              required
            />

            <button type="submit">
              Change Password
            </button>

          </form>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default VillagerProfile;
