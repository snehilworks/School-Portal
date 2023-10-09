import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./../styles/Appbar.css"; // Import the CSS file

function Appbar({}) {
  const navigate = useNavigate();

  return (
    <div className="appbar-container">
      <div className="appbar-logo" onClick={() => navigate("/")}>
        <Typography variant="h5">Univ Website</Typography>
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
          onClick={() => navigate("/student/register")}
        >
          Register
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/student/login")}
          style={{ backgroundColor: "#00008B" }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
