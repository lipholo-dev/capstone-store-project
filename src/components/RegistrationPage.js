import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegistrationPage.css";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";

const RegistrationPage = () => {
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@R!%*?&])[A-Za-z\d@R!%*?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    const { confirmPassword, ...userData } = values;

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser && registeredUser.email === userData.email) {
      setRegistrationError("User already registered. Please login instead.");
    } else {
      localStorage.setItem("registeredUser", JSON.stringify(userData));
      console.log("Registered user:", userData);
      setRegistrationError("");
      setRegistrationSuccess(true);
    }
  };

  const closeErrorPopup = () => {
    setRegistrationError("");
  };

  const closeSuccessPopup = () => {
    setRegistrationSuccess(false);
  };

  return (
    <div className="container">
      <h1 className="header">Register</h1>

      {registrationError && (
        <ErrorPopup
          isOpen={true}
          onClose={closeErrorPopup}
          message={registrationError}
        />
      )}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Formik>

      {registrationSuccess && (
        <SuccessPopup
          isOpen={true}
          onClose={closeSuccessPopup}
          message="Registration successful!"
        />
      )}

      {/* Link to Login page if user is already registered */}
      <p>
        Already registered?{" "}
        <Link to="/login" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
