import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Appbar.css";
import PrimaryButton from "../PrimaryButton";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

// Custom styled components for Menu and MenuItem
const GradientMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundImage: "linear-gradient(to right, #667eea, #764ba2)",
    borderRadius: 8,
    padding: 8,
  },
}));

const GradientMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

function Appbar({}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: indigo["800"] }}
        elevation={0}
      >
        <Toolbar className="w-full max-w-[1440px] mx-auto">
          <div className="w-full flex items-center justify-between font-poppins">
            <div onClick={() => navigate("/")} className="flex items-center">
              <p>Shivam Public</p>
            </div>
            <div
              className="appbar-buttons hidden md:flex"
              style={{ gap: "2rem" }}
            >
              <p className="appbar-link" onClick={() => navigate("/")}>
                Home
              </p>
              <p className="appbar-link" onClick={() => navigate("/about")}>
                About Us
              </p>
              <p className="appbar-link" onClick={() => navigate("/academics")}>
                Academics
              </p>
              <p
                className="appbar-link"
                onClick={() => navigate("/admissions")}
              >
                Admissions
              </p>
              <p className="appbar-link" onClick={() => navigate("/contact")}>
                Contact
              </p>
            </div>
            <div className="appbar-buttons hidden md:flex">
              <PrimaryButton
                color="student"
                onClick={() => navigate("/student/register")}
              >
                Register
              </PrimaryButton>
              <PrimaryButton onClick={() => navigate("/student/login")}>
                Login
              </PrimaryButton>
            </div>
            <div className="md:hidden">
              <IconButton
                aria-label="open menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <GradientMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <GradientMenuItem onClick={() => navigate("/")}>
                  Home
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/about")}>
                  About Us
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/academics")}>
                  Academics
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/admissions")}>
                  Admissions
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/contact")}>
                  Contact
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/student/register")}>
                  Register
                </GradientMenuItem>
                <GradientMenuItem onClick={() => navigate("/student/login")}>
                  Login
                </GradientMenuItem>
              </GradientMenu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
