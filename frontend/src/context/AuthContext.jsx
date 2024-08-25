import { createContext, useContext, useEffect, useState } from "react"; 
import axios from "../api/axios"; 
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(); // Creates context for authentication

function AuthProvider({ children }) {
  const [user, setUser] = useState(); // State to store user information

  useEffect(() => {
    isAuthenticated(); // Checks if user is authenticated when component mounts
  }, []);

  function handleUser(user) {
    setUser(user); // Function to update user state
  }

  async function isAuthenticated() {
    try {
      const response = await axios.get("/auth", {
        headers: { authorization: localStorage.getItem("token") }, // Includes token in request headers
      });
      console.log(response.data); // Log response from server
      handleUser(response.data.user); // Updates user state with received data
    } catch (error) {
      console.log(error); // Log any errors that occur during request
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleUser, setUser }}>
      {children} {/* Render children components inside AuthProvider */}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext); // Access AuthContext
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Returns context value, which includes user, handleUser, and setUser
}

export { AuthProvider, useAuth };
