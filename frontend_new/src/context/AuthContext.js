import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Login
  const login = (data) => {
    if (!data || !data.token) {
      console.error("Invalid login data");
      return;
    }

    setUser(data);

    // Store safely
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
