import { useEffect, useState } from "react";
import api from "../../utils/axios";
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get("/admin/profile");
    setProfile(res.data.admin);
  };

  const updateProfile = async () => {
    await api.put("/admin/profile", profile);
    alert("Profile updated");
  };

  const changePassword = async () => {
    await api.put("/admin/change-password", password);

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
