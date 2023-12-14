// Order.js
import React, { useState, useEffect } from "react";
import "./Order.css";

function Order() {
  const orderApiUrl = "http://helpyouservice.in:4005/order/GetOrders";

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch(orderApiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const responseData = await response.json();

      if (
        !responseData ||
        !responseData.msg ||
        responseData.msg !== "Data fetched successfully"
      ) {
        throw new Error("Invalid response format");
      }

      const receivedOrders = responseData.data || [];
      setOrders(receivedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // You can choose to handle the error in some other way if needed
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleAddressDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowAddressDetails(true);
  };

  const handleProductDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowProductDetails(true);
  };

  const handleUserDetailsClick = (order) => {
    setSelectedOrder(order);
    setShowUserDetails(true);
  };

  const renderOrders = () => {
    return orders.map((order) => (
      <div className="Order-item" key={order.id}>
        <p className="order-info">
          <strong>Order ID:</strong> {order.id}
          <br />
          <strong>Order Date :</strong>{" "}
          {formatDateTime(order.address.created_at)}
        </p>
        <button onClick={() => handleOrderDetailsClick(order)}>
          Show Order Details
        </button>
        <button onClick={() => handleUserDetailsClick(order)}>
          Show User Details
        </button>
        <button onClick={() => handleProductDetailsClick(order)}>
          Show Product Details
        </button>
        <button onClick={() => handleAddressDetailsClick(order)}>
          Show Address Details
        </button>
      </div>
    ));
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDateTime;
  };

  const renderPopup = () => {
    if (showOrderDetails && selectedOrder) {
      return (
        <div className="Popup">
          <h3>Order Details</h3>
          <p className="order-info">
            <strong>Order ID:</strong> {selectedOrder.id}
          </p>
          <p className="order-info">
            <strong>Payment Type:</strong> {selectedOrder.payment_type}
          </p>
          <p className="order-info">
            <strong>Date:</strong> {selectedOrder.date}
          </p>
          <p className="order-info">
            <strong>Time:</strong> {selectedOrder.time}
          </p>
          <p className="order-info">
            <strong>Note:</strong> {selectedOrder.note}
          </p>
          <button onClick={() => setShowOrderDetails(false)}>Close</button>
        </div>
      );
    }

    if (showUserDetails && selectedOrder) {
      return (
        <div className="Popup">
          <h3>User Details</h3>
          <p>
            <strong>User ID:</strong> {selectedOrder.user.user_id}
          </p>
          <p>
            <strong>Name:</strong> {selectedOrder.user.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedOrder.user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {selectedOrder.user.mobile}
          </p>
          <p>
            <strong>Country Code:</strong> {selectedOrder.user.country_code}
          </p>
          <p>
            <strong>WhatsApp No:</strong> {selectedOrder.user.whatsapp_no}
          </p>
          {/* Add other user details as needed */}
          <button onClick={() => setShowUserDetails(false)}>Close</button>
        </div>
      );
    }

    if (showProductDetails && selectedOrder) {
      return (
        <div className="Popup">
          <h3>Product Details</h3>
          {selectedOrder.products.map((product) => (
            <div key={product.id}>
              <p>
                <strong>Product ID:</strong> {product.id}
              </p>
              <p>
                <strong>Product Name:</strong> {product.product_name}
              </p>
              <p>
                <strong>Product MRP:</strong> {product.product_mrp}
              </p>
              {/* Add other product details as needed */}
            </div>
          ))}
          <button onClick={() => setShowProductDetails(false)}>Close</button>
        </div>
      );
    }

    if (showAddressDetails && selectedOrder) {
      return (
        <div className="Popup">
          <h3>Address Details</h3>
          <p>
            <strong>Full Name:</strong> {selectedOrder.address.full_name}
          </p>
          <p>
            <strong>Mobile:</strong> {selectedOrder.address.mobile}
          </p>
          <p>
            <strong>Pincode:</strong> {selectedOrder.address.pincode}
          </p>
          <p>
            <strong>State:</strong> {selectedOrder.address.state}
          </p>
          <p>
            <strong>City:</strong> {selectedOrder.address.city}
          </p>
          <p>
            <strong>Address 1:</strong> {selectedOrder.address.address_1}
          </p>
          <p>
            <strong>Address 2:</strong> {selectedOrder.address.address_2}
          </p>
          <p>
            <strong>Address Type:</strong> {selectedOrder.address.address_type}
          </p>
          <button onClick={() => setShowAddressDetails(false)}>Close</button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="Order-fullscreen-container">
      <h2 className="order-title">Order Details</h2>
      {renderOrders()}
      {renderPopup()}
    </div>
  );
}

export default Order;
