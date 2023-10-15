import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import "./StPays.css";

function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    // You'll need to make a server request to generate a Razorpay payment
    // Replace 'your_backend_endpoint' with the actual endpoint.
    const response = await fetch("/your_backend_endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, name, email }),
    });

    const { razorpay_order_id } = await response.json();

    // Initialize Razorpay and open the payment modal
    const razorpay = new Razorpay({
      key_id: "YOUR_RAZORPAY_KEY_ID",
      amount,
      order_id: razorpay_order_id,
      name,
      description: "School Fee Payment",
      image: "/your_school_logo.png", // URL to your school's logo
      handler: function (response) {
        // Handle the success and failure of the payment here
        alert(`Payment ${response.razorpay_payment_id} successful!`);
      },
      prefill: {
        name,
        email,
      },
    });
    razorpay.open();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        School Fee Payment
      </Typography>
      <TextField
        label="Student Name"
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Student Email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Amount (INR)"
        fullWidth
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={!amount || !name || !email}
      >
        Pay Now
      </Button>
    </Container>
  );
}

export default PaymentsPage;
