import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Box,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../store/atoms/user";
import { BASE_URL } from "../../../config";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/student/register`, {
        username: email,
        password: password,
      });
      const data = response.data;
      if (response.status === 201) {
        localStorage.setItem("token", data.token);
        setUser({ userEmail: email, isLoading: false });
        navigate("/dashboard");
      } else {
        console.error("Registration failed:", data.message);
        // Handle registration failure, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure, such as displaying an error message to the user
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card variant="outlined" sx={{ p: 3, mx: { xs: 2 }, borderRadius: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <LockOutlinedIcon sx={{ fontSize: 48 }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Create an Account
          </Typography>
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
            onClick={handleRegister}
          >
            Register
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/student/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Register;