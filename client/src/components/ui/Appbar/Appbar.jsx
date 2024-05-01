import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Appbar.css";
import PrimaryButton from "../PrimaryButton";
import { indigo } from "@mui/material/colors";

function Appbar({}) {
  const navigate = useNavigate();

  return (
    <>
      <AppBar sx={{ backgroundColor: indigo["800"] }} elevation={0}>
        <Toolbar className="w-full max-w-[1440px] mx-auto">
          <div className="w-full flex items-center justify-between font-poppins">
            <div onClick={() => navigate("/")}>
              <p>Shivam Public</p>
            </div>

            <div className="appbar-buttons" style={{ gap: "2rem" }}>
              <p className="appbar-link" onClick={() => navigate("/")}>
                Home
              </p>
              <p className="appbar-link" onClick={() => navigate("/about")}>
                About Us
              </p>
              <p className="appbar-link" onClick={() => navigate("/academics")}>
                Academics
              </p>
              <p className="appbar-link" onClick={() => navigate("/admissions")}>
                Admissions
              </p>
              <p className="appbar-link" onClick={() => navigate("/contact")}>
                Contact
              </p>
            </div>

            <div className="appbar-buttons">
              <PrimaryButton color="student" onClick={() => navigate("/student/register")}>
                Register
              </PrimaryButton>
              <PrimaryButton onClick={() => navigate("/student/login")}>Login</PrimaryButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
