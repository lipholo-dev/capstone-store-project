import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import necessary components from react-router-dom
import Products from "./components/Products"; // Import Products component
import TotalPrice from "./components/TotalPrice"; // Import TotalPrice component
import LoginPage from "./components/LoginPage"; // Import LoginPage component
import RegistrationPage from "./components/RegistrationPage"; // Import RegistrationPage component
import HomePage from "./components/HomePage"; // Import HomePage component
import NavBar from "./components/NavBar"; // Import NavBar component
import About from "./components/About"; // Import About component
import Cart from "./components/Cart"; // Import Cart component
import Contact from "./components/Contact"; // Import Contact component
import { CartProvider } from "./CartContext"; // Import CartProvider for managing cart state
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute for authenticated routes
import "./App.css"; // Import app-specific CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
  // State for total price and visibility of total price component
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTotalPriceVisible, setIsTotalPriceVisible] = useState(false);

  // Function to handle adding to total price and showing the total price component
  const handleBuy = (price) => {
    setTotalPrice((prevTotal) => prevTotal + price);
    setIsTotalPriceVisible(true);
  };

  // Function to clear total price and hide the total price component
  const clearTotalPrice = () => {
    setTotalPrice(0);
    setIsTotalPriceVisible(false);
  };

  return (
    <Router>
      {" "}
      {/* BrowserRouter wraps the entire application for routing */}
      <CartProvider>
        {" "}
        {/* CartProvider provides cart state management */}
        <div>
          <NavBar /> {/* Render navigation bar */}
          <div className="content-container">
            {" "}
            {/* Main content container */}
            {/* Render the content with props passed down */}
            <Content
              totalPrice={totalPrice}
              isTotalPriceVisible={isTotalPriceVisible}
              handleBuy={handleBuy}
              clearTotalPrice={clearTotalPrice}
            />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
};

// Content component manages rendering of different routes
const Content = ({
  totalPrice,
  isTotalPriceVisible,
  handleBuy,
  clearTotalPrice,
}) => {
  return (
    <div>
      {/* Render TotalPrice component if isTotalPriceVisible is true */}
      {isTotalPriceVisible && (
        <div className="total-price-container">
          <TotalPrice totalPrice={totalPrice} />
        </div>
      )}
      <Routes>
        {" "}
        {/* Define routes for different components */}
        <Route path="/" element={<Navigate to="/main" />} />{" "}
        {/* Redirect root path to /main */}
        <Route path="/main" element={<HomePage />} />{" "}
        {/* Render HomePage component for /main route */}
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Render LoginPage component for /login route */}
        <Route path="/register" element={<RegistrationPage />} />{" "}
        {/* Render RegistrationPage component for /register route */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products handleBuy={handleBuy} />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart clearTotalPrice={clearTotalPrice} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
