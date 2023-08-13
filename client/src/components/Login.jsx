import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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
        <Typography
          variant={"h3"}
          style={{ fontFamily: "timesnewRoman", fontWeight: "bold" }}
        >
          Login
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField fullWidth={true} label="Email" variant="outlined" />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            style={{ backgroundColor: "#00008B" }}
          >
            {" "}
            Login
          </Button>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Card style={{ width: 400, padding: 10, marginTop: 30 }}>
          <b>New Here?</b>
          <Button
            size={"small"}
            variant="contained"
            onClick={() => {
              navigate("/register");
            }}
            style={{ margin: 10 }}
          >
            {" "}
            Register
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Login;
