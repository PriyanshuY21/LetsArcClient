import { useNavigate } from "react-router-dom"; 
import { LoginForm } from "../components"; 
import profile from "../assets/profile.svg"; 

const Login = () => {
  const navigate = useNavigate(); // Initializes navigate function for programmatic navigation

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2.5">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray-300 px-10 py-10">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue1/90 bg-gray-200">
          <img
            src={profile}
            alt="logo"
            className="h-[50%] w-[50%] cursor-pointer object-contain"
            onClick={() => navigate("/")} // Navigates to home route when image is clicked
          />
        </div>
        <LoginForm /> {/* The LoginForm component is rendered below profile image */}
      </div>
    </div>
  );
};

export default Login;
