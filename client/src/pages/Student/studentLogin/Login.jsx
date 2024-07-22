import {
  Card,
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../store/atoms/user";
import { authState } from "../../../store/atoms/auth";
import ErrorModal from "../../../components/ErrorModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const setUser = useSetRecoilState(userState);
  const setAuthState = useSetRecoilState(authState);

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/student/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("studentToken", data.token);
        setUser({ userEmail: email, isLoading: false });
        setAuthState({ isAuthenticated: true });

        console.log("Navigating to /student/dashboard");
        navigate("/student/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.message); // Set the error message
      } else {
        console.error("Login failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, mx: 2 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" mt={2}>
              Welcome Back! Please Login
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
            type="password"
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading} // Disable input when loading
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Button
                variant="text"
                size="small"
                style={{ color: "#00008B" }}
                onClick={() => navigate("/student/register")}
                disabled={loading} // Disable button when loading
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <ErrorModal error={error} onClose={() => setError(null)} />
    </Grid>
  );
}

export default Login;
