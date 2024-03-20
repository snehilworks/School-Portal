import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./Contact.css";

const ContactPage = () => {
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
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                style={{ margin: 5 }}
              />
              <TextField
                label="Send Us Message"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                style={{ margin: 5 }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
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
    </Container>
  );
};

export default ContactPage;
