import React from "react";
import { useCart } from "../CartContext"; // Import the custom cart context
import { Button, Card } from "react-bootstrap"; // Import Bootstrap components
import "./Cart.css"; // Import custom CSS for Cart page

const Cart = ({ clearTotalPrice }) => {
  const { cartItems, clearCart } = useCart(); // Destructure cartItems and clearCart from the custom cart context

  // Function to handle clearing the cart
  const handleClearCart = () => {
    clearCart(); // Clear the cart items
    clearTotalPrice(); // Clear the total price
  };

  // Function to handle cashout (to be implemented)
  const handleCashout = () => {
    alert("Cashout functionality will be implemented here"); // Placeholder for cashout logic
  };

  return (
    <div className="cart-page">
      {" "}
      {/* Container for the Cart page */}
      <div className="container-fluid">
        {" "}
        {/* Container with fluid width */}
        <h2 className="cart-heading">Cart</h2> {/* Heading for the Cart page */}
        {cartItems.length >
          0 /* Conditional rendering based on cart items */ && (
          <div className="cart-actions">
            {" "}
            {/* Container for cart actions */}
            <Button variant="danger" onClick={handleClearCart} className="mr-2">
              Clear Cart {/* Button to clear the cart */}
            </Button>
            <Button variant="success" onClick={handleCashout}>
              Cashout {/* Button to proceed to cashout */}
            </Button>
          </div>
        )}
        {cartItems.length === 0 /* Conditional rendering if cart is empty */ ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <div className="row">
            {" "}
            {/* Container for cart items */}
            {cartItems.map(
              (item, index /* Map over cart items to display each item */) => (
                <div className="col-md-2 mb-4" key={index}>
                  {" "}
                  {/* Column for each cart item */}
                  <Card className="h-100">
                    {" "}
                    {/* Card for individual cart item */}
                    <Card.Img
                      variant="top"
                      src={item.imageUrl}
                      alt={item.title}
                    />{" "}
                    {/* Image for the cart item */}
                    <Card.Body>
                      {" "}
                      {/* Body of the card */}
                      <Card.Title>{item.title}</Card.Title>{" "}
                      {/* Title of the cart item */}
                      <Card.Text>{item.description}</Card.Text>{" "}
                      {/* Description of the cart item */}
                      <Card.Text>R{item.price.toFixed(2)}</Card.Text>{" "}
                      {/* Price of the cart item */}
                    </Card.Body>
                  </Card>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
