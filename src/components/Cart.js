import React, { useState } from "react";
import { useCart } from "../CartContext"; // Import the custom cart context
import { Button, Card, Modal, Form } from "react-bootstrap"; // Import Bootstrap components
import "./Cart.css"; // Import custom CSS for Cart page

const Cart = ({ clearTotalPrice }) => {
  const { cartItems, clearCart } = useCart(); // Destructure cartItems and clearCart from the custom cart context
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle clearing the cart
  const handleClearCart = () => {
    clearCart(); // Clear the cart items
    clearTotalPrice(); // Clear the total price
  };

  // Function to handle cashout (to be implemented)
  const handleCashout = () => {
    setShowModal(true); // Show the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  // Calculate the total price of the items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      {" "}
      {/* Container for the Cart page */}
      <div className="container-fluid">
        {" "}
        {/* Container with fluid width */}
        <h2 className="cart-heading">Cart</h2> {/* Heading for the Cart page */}
        {cartItems.length > 0 && (
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
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <div>
            <div className="row">
              {" "}
              {/* Container for cart items */}
              {cartItems.map((item, index) => (
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
              ))}
            </div>
            <div className="total-price">
              {" "}
              {/* Container for total price */}
              <h3>Total Price: R{totalPrice.toFixed(2)}</h3>{" "}
              {/* Display total price */}
            </div>
          </div>
        )}
      </div>
      {/* Modal for cashout */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cashout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="shippingMethod">
              <Form.Label>Shipping Method</Form.Label>
              <Form.Control as="select">
                {" "}
                {/* Shipping Options */}
                <option>Standard Shipping</option>
                <option>Express Shipping</option>
                <option>Overnight Shipping</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="paymentDetails">
              <Form.Label>Payment Details</Form.Label>
              <Form.Control type="text" placeholder="Card Number" />
              <Form.Control
                type="text"
                placeholder="Cardholder Name"
                className="mt-2"
              />
              <Form.Control
                type="text"
                placeholder="Expiration Date"
                className="mt-2"
              />
              <Form.Control type="text" placeholder="CVV" className="mt-2" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              alert("Cashout functionality to be implemented");
            }}
          >
            Confirm Cashout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
