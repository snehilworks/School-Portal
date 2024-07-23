import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSend = async () => {
    try {
      await axios.post(`${process.env.API_URL}/api/home/contact`, {
        name,
        email,
        message,
      });
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
    <div className="w-full min-h-screen bg-yellow-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl text-center font-semibold text-gray-700 mb-6">
              Get in Touch
            </h3>
            <form className="space-y-4">
              <div>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <div>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Send
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              Contact Information
            </h3>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Email:</span>{" "}
              shivampublicschool@gmail.com
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span> 123 School Street,
              City
            </p>
          </div>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          className="mt-4"
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
      </div>
    </div>
  );
};

export default ContactPage;
