import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Payment } from "@mui/icons-material";
import "./StPays.css";

function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    // Simulated payment process
    alert(`Processing payment for ${name}...`);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          borderRadius: 8,
          padding: 3,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          mt: 4, // Better margin top
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item xs={12}>
            <Payment fontSize="large" color="primary" />
            <Typography variant="h4" component="h2" gutterBottom>
              School Fee Payment
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Student Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Student Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount (INR)"
              fullWidth
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={!amount || !name || !email}
              fullWidth
            >
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PaymentsPage;
