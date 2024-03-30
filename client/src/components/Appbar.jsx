import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./../styles/Appbar.css"; // Import the CSS file

function Appbar({}) {
  const navigate = useNavigate();

  return (
    <div className="appbar-container">
      <div className="appbar-logo" onClick={() => navigate("/")}>
        <Typography variant="h5">Shivam Public </Typography>
      </div>
      <div className="appbar-buttons">
        <Button variant="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant="inherit" onClick={() => navigate("/about")}>
          About Us
        </Button>
        <Button variant="inherit" onClick={() => navigate("/academics")}>
          Academics
        </Button>
        <Button variant="inherit" onClick={() => navigate("/admissions")}>
          Admissions
        </Button>
        <Button variant="inherit" onClick={() => navigate("/contact")}>
          Contact
        </Button>
      </div>
      <div className="appbar-actions">
        <Button
          variant="contained"
          color="primary" // Set the color to primary for the Register button
          onClick={() => navigate("/student/register")}
          sx={{ borderRadius: 20, textTransform: "none" }} // Add styling for modern look
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="secondary" // Set the color to secondary for the Login button
          onClick={() => navigate("/student/login")}
          sx={{ borderRadius: 20, textTransform: "none", bgcolor: "#00008B" }} // Add styling for modern look
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
