import React from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for using icons
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import cart icon from FontAwesome

import "./TotalPrice.css"; // Import custom CSS for TotalPrice component

const TotalPrice = ({ totalPrice }) => {
  return (
    <div
      style={{
        width: "12vw",
        marginLeft: "0vw",
        borderRadius: "100px",
        position: "fixed",
        zIndex: "1000",
      }}
    >
      <Link to="/cart" className="btn btn-secondary">
        {" "}
        {/* Link to Cart page */}
        Cashout {/* Text displayed for the link */}
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />{" "}
        {/* Cart icon from FontAwesome */}R{totalPrice.toFixed(2)}{" "}
        {/* Display total price formatted with two decimal places */}
      </Link>
    </div>
  );
};

export default TotalPrice;
