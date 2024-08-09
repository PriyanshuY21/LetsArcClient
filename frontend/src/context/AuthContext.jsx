import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    isAuthenticated();
  }, []);

  function handleUser(user) {
    setUser(user);
  }

  async function isAuthenticated() {
    try {
      const response = await axios.get("/auth", {
        headers: { authorization: localStorage.getItem("token") },
      });
      console.log(response.data);
      handleUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
