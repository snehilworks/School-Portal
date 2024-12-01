import React, { useState } from "react";
import { TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import PrimaryButton from "../../components/ui/PrimaryButton";

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
    <div className="w-full min-h-screen mt-0 bg-teal-50 py-3">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <h2 className="text-4xl font-bold text-teal-800 text-center mb-10">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-teal-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-teal-800 mb-6 text-center">
              Get in Touch
            </h3>
            <form className="space-y-6">
              <div>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-teal-50 rounded-lg"
                  required
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-teal-50 rounded-lg"
                  required
                />
              </div>
              <div>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={6}
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-teal-50 rounded-lg"
                  required
                />
              </div>
              <PrimaryButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSend}
                className="bg-teal-600 ml-14 hover:bg-teal-700 rounded-lg transition-colors duration-300"
              >
                Send Message
              </PrimaryButton>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-teal-200 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-teal-800 mb-6">
              Contact Information
            </h3>
            <p className="text-teal-600 mb-4">
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:shivampublicschool@gmail.com" className="text-teal-600 hover:underline">
                shivampublicschool@gmail.com
              </a>
            </p>
            <p className="text-teal-600 mb-4">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-teal-600">
              <span className="font-semibold">Address:</span> 123 School Street, City
            </p>
          </div>
        </div>

        {/* Snackbar for success message */}
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
            className="!bg-teal-600"
          >
            Your message has been sent successfully!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ContactPage;
