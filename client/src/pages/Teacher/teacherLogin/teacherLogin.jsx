import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../store/atoms/user";
import "./TeacherLogin.css"; // Import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div className="title-text">
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Teacher Login
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="card" variant="outlined">
          <TextField
            fullWidth
            label="Teacher's Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Teacher's Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            className="login-button"
            size="large"
            variant="contained"
            onClick={async () => {
              const response = await axios.post(`${BASE_URL}/admin/signup`, {
                username: email,
                password: password,
              });
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/dashboard");
            }}
            style={{
              backgroundColor: "#ff5722",
            }}
          >
            Login
          </Button>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Card className="card">
          <b>New Here ?</b>
          <Button
            className="register-button"
            variant="contained"
            size="small"
            onClick={() => {
              navigate("/teacher/register");
            }}
            style={{ backgroundColor: "#106013", margin: 10 }}
          >
            Register
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Register;
