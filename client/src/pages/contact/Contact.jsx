import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./Contact.css";
import axios from "axios";
import { BASE_URL } from "../../config";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSend = async () => {
    try {
      await axios.post(`${BASE_URL}/api/home/contact`, {
        name,
        email,
        message,
      });
      // Optionally, you can clear the input fields after sending
      setName("");
      setEmail("");
      setMessage("");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="contact-container">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className="contact-form" elevation={3}>
            <Typography variant="h5" component="div">
              Contact Us
            </Typography>
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                style={{ margin: 5 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                style={{ margin: 5 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Send Us Message"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                style={{ margin: 5 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
                onClick={handleSend}
              >
                Send
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="contact-info" elevation={3}>
            <Typography variant="h5" component="div">
              Contact Information
            </Typography>
            <Typography>
              <b>Email</b>: shivampublicschool@gmail.com
            </Typography>
            <Typography>
              <b>Phone</b>: (123) 456-7890
            </Typography>
            <Typography>
              <b>Address</b>: 123 School Street, City
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Message sent successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;
