import { Grid, Box, Paper, Avatar, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../store/atoms/user";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/api/teacher/login`, {
        email: email,
        password: password,
      });
      
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("teacherToken", data.token);
        setUser({ userEmail: email, isLoading: false });
        navigate("/teacher/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
        // Handle login failure, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, mx: 2 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar sx={{ bgcolor: "rgb(31 41 55)", mb: 2 }}>
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
            <TextField fullWidth label="Teacher's Email" variant="outlined" margin="normal" value={email} onChange={(event) => setEmail(event.target.value)} />
            <TextField fullWidth label="Teacher's Password" variant="outlined" type="password" margin="normal" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 2 }} style={{ backgroundColor: "#00bcd4", color: "#fff" }}>
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TeacherLogin;
