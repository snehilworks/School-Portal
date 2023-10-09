import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import "./Contact.css";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = true;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = true;
    }

    if (!formData.message.trim()) {
      errors.message = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Handle form submission logic (e.g., sending an email)
    console.log("Form submitted:", formData);
  };

  return (
    <Container maxWidth="md" className="container">
      <Typography variant="h4" align="center">
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              error={formErrors.name}
              helperText={formErrors.name ? "Please enter your name" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={formErrors.email}
              helperText={
                formErrors.email ? "Please enter a valid email address" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              error={formErrors.message}
              helperText={formErrors.message ? "Please enter your message" : ""}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUsPage;
