import {
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  CircularProgress,
  Modal,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../../store/atoms/user";
import { authState } from "../../store/atoms/auth";
import ErrorModal from "../../components/ErrorModal";

function RegisterModal({ onClose, onOpenLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setAuthState = useSetRecoilState(authState);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      console.log("Attempting to register...");
      const response = await axios.post(
        `${process.env.API_URL}/api/student/register`,
        {
          email,
          password,
        }
      );

      console.log("Registration response:", response);

      if (response.status === 201) {
        const data = response.data;
        const token = data.token;

        console.log("Registration successful, token received:", token);
        localStorage.setItem("studentToken", token);
        setUser({ userEmail: email, isLoading: false });
        setAuthState({ isAuthenticated: true });

        const profileResponse = await axios.get(
          `${process.env.API_URL}/api/student/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const studentProfile = profileResponse.data;

        console.log("Navigating to complete profile page");
        navigate("/student/complete/profile");
      } else {
        console.error("Registration failed:", response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.message);
      } else {
        console.error("Registration failed:", error);
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Modal
      open={true}
      onClose={onClose} // Handle backdrop or ESC key
      className="bg-transparent"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
        onClick={handleBackdropClick}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          onClick={(e) => e.stopPropagation()}
        >
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, mx: 2 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <Avatar sx={{ bgcolor: "#0284C7", mb: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="h1" mt={2}>
                Create an Account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading} // Disable input when loading
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading} // Disable input when loading
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{
                        padding: "0.7rem",
                      }}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-2xl text-sky-600" />
                      ) : (
                        <FaEye className="text-2xl text-sky-600" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#075985",
                color: "#fff",
                borderRadius: "6rem",
              }}
              sx={{ mt: 2 }}
              onClick={handleRegister}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button
                  variant="text"
                  size="small"
                  style={{ color: "#00008B" }}
                  onClick={() => onOpenLogin()}
                  disabled={loading} // Disable button when loading
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <ErrorModal error={error} onClose={() => setError(null)} />
      </Grid>
    </Modal>
  );
}

export default RegisterModal;
