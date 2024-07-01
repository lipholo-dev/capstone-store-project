// src/components/LoginPage.js

// Import necessary components and functions from React and other libraries
import React from "react";
import { useNavigate } from "react-router-dom"; // Use navigate hook for navigation
import { Formik, Form, Field, ErrorMessage } from "formik"; // Formik components for form handling
import * as Yup from "yup"; // Yup for form validation
import "./LoginPage.css"; // Import CSS file for styling

// Define the LoginPage component
const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser")); // Retrieve registered user from localStorage

    // Check if registered user exists
    if (registeredUser) {
      const { email, password } = values;

      // Check if entered credentials match registered user
      if (
        registeredUser.email === email &&
        registeredUser.password === password
      ) {
        navigate("/products", { state: { user: registeredUser } }); // Navigate to main screen with user data
      } else {
        alert("Invalid email or password."); // Alert if credentials do not match
      }
    } else {
      alert("No registered user found. Please register first."); // Alert if no registered user found
    }
  };

  // Render the login form using Formik for form management and Yup for validation
  return (
    <div className="container">
      <h1 className="header">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

// Export the LoginPage component as the default export
export default LoginPage;
