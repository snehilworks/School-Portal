import React from "react";
import { Typography, Container, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PrimaryButton from "../../components/ui/PrimaryButton";

const PaymentCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = location.state || {}; // Read paymentId from state

  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={5}
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="bg-green-100"
        boxShadow={3}
        borderRadius={2}
        textAlign="center"
      >
        <CheckCircleOutlineIcon style={{ fontSize: 80, color: "#4caf50" }} />
        <Typography variant="h4" gutterBottom style={{ marginTop: 16 }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for your payment. Your transaction was completed
          successfully.
        </Typography>
        {paymentId && (
          <Typography variant="body2" color="textSecondary" paragraph>
            Your Payment ID: <b>{paymentId}</b>
          </Typography>
        )}
        <Typography variant="body1" color="textPrimary">
          Share this with your School Teacher.
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          If you have any questions or need further assistance, please contact
          support.
        </Typography>
        <PrimaryButton
          variant="contained"
          color="primary"
          onClick={handleGoBackHome}
          style={{ marginTop: 24 }}
        >
          Go Back to Home
        </PrimaryButton>
      </Box>
    </Container>
  );
};

export default PaymentCompletion;
