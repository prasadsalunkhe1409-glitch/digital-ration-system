import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../layout/Sidebar";
import Footer from "../../components/Footer";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  // LOAD PROFILE
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfile(res.data.admin);
  };

  // UPDATE PROFILE
  const updateProfile = async () => {
    await axios.put("http://localhost:5000/api/admin/profile", profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Profile updated");
  };

  // CHANGE PASSWORD
  const changePassword = async () => {
    await axios.put(
      "http://localhost:5000/api/admin/change-password",
      password,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Password changed");

    setPassword({
      currentPassword: "",
      newPassword: "",
    });
  };

  return (
    <div className="layout">
      <Sidebar role="admin" />

      <div className="content">
        <h1>Admin Profile</h1>

        {/* PROFILE */}
        <div className="profile-card">
          <h3>Profile Info</h3>

          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
          />

          <input
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <button onClick={updateProfile}>Update Profile</button>
        </div>

        {/* PASSWORD */}
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

export default AdminProfile;
