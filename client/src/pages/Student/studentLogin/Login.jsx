import { Card, Typography, Grid, Box, Paper, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { userState } from "../../../store/atoms/user";
import { BASE_URL } from "../../../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/student/login`, {
        email: email,
        password: password,
      });
      const data = response.data;
      if (response.status === 201) {
        localStorage.setItem("token", data.token);
        setUser({ userEmail: email, isLoading: false });
        navigate("/student/dashboard");
      } else {
        console.error("Login failed:", data.message);
        // Handle login failure, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, such as displaying an error message to the user
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
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Button
                variant="text"
                size="small"
                style={{ color: "#00008B" }}
                onClick={() => navigate("/student/register")}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
