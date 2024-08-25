import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard, Login } from "./pages"; 
import { useAuth } from "./context/AuthContext.jsx"; 
import LetsarcApp from "../../Letsarc/src/App.jsx"; 

const App = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { user, setUser } = useAuth(); // Get current user and setUser function from Auth context

  // useEffect runs handleUser function whenever user state changes
  useEffect(() => {
    handleUser(user);
  }, [user]);

  // Function to handle user authentication and navigation
  const handleUser = (user) => {
    setUser(user); // Sets user in Auth context
    if (user) {
      navigate("/letsarc"); // If user is logged in, navigates to Letsarc app
    }
  };

  return (
    <div className="font-outfit">
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        {/* If user is authenticated, show Dashboard; otherwise, show Login */}
        <Route path="/letsarc" element={<LetsarcApp />} />
        {/* Route to Letsarc application */}
      </Routes>

      {/* Setup toaster notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          className:
            "text-lg bg-blue1/90 text-white2 tracking-wide font-outfit font-medium",
          success: {
            duration: 2000,
          },
        }}
      />
    </div>
  );
};

export default App;
