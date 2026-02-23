import React, { useState } from "react";
import MapComponent from "./MapComponent";

function OrderForm() {
  const warehouse = { lat: 7.0647, lng: 125.6088 };

  const [formData, setFormData] = useState({ customerName: "", customerAddress: "" });
  const [customer, setCustomer] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerAddress && !customer) {
      return alert("Please enter an address or select location on the map!");
    }

    const payload = {
      customerName: formData.customerName,
      customerAddress: formData.customerAddress,
      customerLat: customer?.customerLat,
      customerLng: customer?.customerLng
    };

    try {
      const response = await fetch("https://localhost:7099/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error creating order");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Customer Address:</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            placeholder="Click on map or type address"
            style={{ width: "100%", padding: "6px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Create Order
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <MapComponent
          warehouse={warehouse}
          customer={customer}
          setCustomer={setCustomer}
          setAddress={(address) => setFormData((prev) => ({ ...prev, customerAddress: address }))}
        />
      </div>

      {result && (
        <div style={{ marginTop: "20px", background: "#333", padding: "10px" }}>
          <h3>Order Created!</h3>
          <p><strong>Customer:</strong> {result.customerName}</p>
          <p><strong>Address:</strong> {result.customerAddress}</p>
          <p><strong>Distance:</strong> {result.distanceKm?.toFixed(2)} km</p>
          <p><strong>ETA:</strong> {result.durationMinutes?.toFixed(0)} minutes</p>
        </div>
      )}
    </div>
  );
}

export default OrderForm;