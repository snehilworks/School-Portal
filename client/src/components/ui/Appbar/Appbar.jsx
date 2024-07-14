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
import { useState, useEffect } from "react";
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

const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: "red",
  border: "1px solid red",
  borderRadius: "7%",
  "&:hover": {
    backgroundColor: "red",
  },
}));

const RegisterMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "cyan",
  fontWeight: "bold",
  // border: "1px solid white",
  // borderRadius: "7%",
  "&:hover": {
    backgroundColor: "red",
  },
}));

const LoginMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  // border: "1px solid white",
  // borderRadius: "7%",
  "&:hover": {
    backgroundColor: "red",
  },
}));

function Appbar({}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //cookies - 45 min session done ... cookies will delete jwt expiry time and cookie expiry time should be same
  //localstorage forever -> (first thing this is fine)
  //session storage .. only for 1 tab and 1 session

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/student/login");
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
              {isAuthenticated ? (
                <>
                  <PrimaryButton color="logout" onClick={handleLogout}>
                    Logout
                  </PrimaryButton>
                </>
              ) : (
                <></>
              )}
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
                <GradientMenuItem
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}
                >
                  Home
                </GradientMenuItem>
                <GradientMenuItem
                  onClick={() => {
                    navigate("/about");
                    handleClose();
                  }}
                >
                  About Us
                </GradientMenuItem>
                <GradientMenuItem
                  onClick={() => {
                    navigate("/academics");
                    handleClose();
                  }}
                >
                  Academics
                </GradientMenuItem>
                <GradientMenuItem
                  onClick={() => {
                    navigate("/admissions");
                    handleClose();
                  }}
                >
                  Admissions
                </GradientMenuItem>
                <GradientMenuItem
                  onClick={() => {
                    navigate("/contact");
                    handleClose();
                  }}
                >
                  Contact
                </GradientMenuItem>
                {isAuthenticated ? (
                  <LogoutMenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    Logout
                  </LogoutMenuItem>
                ) : (
                  <>
                    <RegisterMenuItem
                      onClick={() => {
                        navigate("/student/register");
                        handleClose();
                      }}
                    >
                      Register
                    </RegisterMenuItem>
                    <LoginMenuItem
                      color="red"
                      onClick={() => {
                        navigate("/student/login");
                        handleClose();
                      }}
                    >
                      Login
                    </LoginMenuItem>
                  </>
                )}
              </GradientMenu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
