import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PrimaryButton from "../../components/ui/PrimaryButton";

const PaymentCompletion = () => {
  const navigate = useNavigate();

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
