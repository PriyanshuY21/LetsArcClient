import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard, Login } from "./pages";
import { useAuth } from "./context/AuthContext.jsx";
import LetsarcApp from "../../Letsarc/src/App.jsx";

const App = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    handleUser(user);
  }, [user]);

  const handleUser = (user) => {
    setUser(user);
    if (user) {
      navigate("/letsarc");
    }
  };

  return (
    <div className="font-outfit">
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path="/letsarc" element={<LetsarcApp />} />
      </Routes>

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
