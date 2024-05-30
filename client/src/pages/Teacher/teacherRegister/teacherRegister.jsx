import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../store/atoms/user";
import "./teacherRegister.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h4"} style={{ fontWeight: "bold" }}>
          Teacher's Registration
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth={true}
            label="Teacher's Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Teacher's Password"
            variant="outlined"
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const response = await axios.post(`${process.env.API_URL}/admin/signup`, {
                username: email,
                password: password,
              });
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/dashboard");
            }}
            style={{ backgroundColor: "#106013" }}
          >
            {" "}
            Register
          </Button>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 10, marginTop: 30 }}>
          <b>Already Have An account ? </b>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#ff5722", margin: 10 }}
            onClick={() => {
              navigate("/teacher/login");
            }}
          >
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Register;
