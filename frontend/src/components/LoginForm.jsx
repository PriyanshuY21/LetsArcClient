import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast"; 
import { useFormik } from "formik"; 
import axios from "../api/axios";
import { loginSchema } from "../schema"; 
import { useAuth } from "../context/AuthContext"; 

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { handleUser } = useAuth(); // Extracts handleUser method from AuthContext

  // Function handling form submission
  const onSubmit = async (values, actions) => {
    try {
      console.log(values); // Log form values for debugging
      // Send POST request to login endpoint with form values
      const response = await axios.post("/login", {
        ...values,
      });
      console.log(response.data); // Log response data for debugging
      // Store user data in context
      handleUser(response.data.user);
      // Save token in local storage
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      // Resets form after successful submission
      actions.resetForm();
      // Show success notification
      toast.success("Login successful!");
      // Navigate to desired route after login
      navigate("/letsarc");
    } catch (error) {
      // Show error notification if login fails
      toast.error(error.response.data.message);
      console.log(error.response.data); // Logs error response for debugging
    }
  };

  // Destructure necessary methods and properties from useFormik
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues, // Set initial form values
    validationSchema: loginSchema, // Apply validation schema
    onSubmit, // Function to handle form submission
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <label
        htmlFor="email"
        className="flex flex-col gap-1 text-base font-semibold tracking-wide text-gray-800"
      >
        Email
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`h-12 w-72 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
            errors.email && touched.email ? "border-[#f66464]" : ""
          }`}
        />
        {/* Display validation error if any */}
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
      </label>

      <label
        htmlFor="password"
        className="flex flex-col gap-1 text-base font-semibold tracking-wide text-gray-800"
      >
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`h-12 w-72 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
            errors.password && touched.password ? "border-[#f66464]" : ""
          }`}
        />
        {/* Display validation error if any */}
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
      </label>

      <button
        type="submit"
        disabled={isSubmitting} // Disable button when form is submitting
        className="h-12 w-full rounded-lg bg-blue1/90 text-lg font-semibold tracking-wider text-white hover:bg-blue1 disabled:opacity-85"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
