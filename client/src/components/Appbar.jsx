import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Appbar({}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
      }}
    >
      <div
        style={{ marginLeft: 10, cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant={"h6"}>Shivam Public School</Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
        <div>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/login");
            }}
            style={{ backgroundColor: "#00008B" }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
