import { useEffect, useState } from "react";
import axios from "axios";
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


  const token = localStorage.getItem("token");


  // ===============================
  // Load Profile
  // ===============================
  useEffect(() => {

    const fetchProfile = async () => {

      const res = await axios.get(
        "http://localhost:5000/api/dealer/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.dealer);
    };

    fetchProfile();

  }, []);



  // ===============================
  // Update Profile
  // ===============================
  const updateProfile = async () => {

    await axios.put(
      "http://localhost:5000/api/dealer/profile",
      profile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated");
  };



  // ===============================
  // Change Password
  // ===============================
  const changePassword = async () => {

    await axios.put(
      "http://localhost:5000/api/dealer/change-password",
      password,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Password changed");

    setPassword({
      currentPassword: "",
      newPassword: "",
    });
  };



  return (
    <div className="layout">

      <Sidebar role="dealer" />

      <div className="content">

        <h1>Dealer Profile</h1>


        <h3>Update Profile</h3>

        <input
          type="text"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />

        <button onClick={updateProfile}>
          Update Profile
        </button>



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

        <button onClick={changePassword}>
          Change Password
        </button>

      </div>
<Footer/>
    </div>
  );
};

export default DealerProfile;
