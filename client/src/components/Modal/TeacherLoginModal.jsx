import {
  Grid,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Modal,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../../store/atoms/user";
import { authState } from "../../store/atoms/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorModal from "../../components/ErrorModal";

function TeacherLoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setAuthState = useSetRecoilState(authState);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/teacher/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("teacherToken", data.token);
        setUser({ userEmail: email, isLoading: false });
        setAuthState({ isAuthenticated: true });
        navigate("/teacher/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.message);
      } else {
        console.error("Login failed:", error);
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
              mb={4}
            >
              <Avatar sx={{ bgcolor: "#06B6D4", mb: 2 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="h1" mt={2}>
                Teacher Login
              </Typography>
            </Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <TextField
                fullWidth
                label="Teacher's Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Teacher's Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
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
                        <FaEyeSlash className="text-2xl text-cyan-400" />
                      ) : (
                        <FaEye className="text-2xl text-cyan-400" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
                style={{
                  backgroundColor: "#0E7490",
                  color: "#fff",
                  borderRadius: "6rem",
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Paper>
        </Grid>
        <ErrorModal error={error} onClose={() => setError(null)} />
      </Grid>
    </Modal>
  );
}

export default TeacherLoginModal;
