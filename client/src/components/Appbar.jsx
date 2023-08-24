import { Typography, Button } from "@mui/material";
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
        <Typography variant={"h5"}> Univ Website</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          variant={"inherit"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          variant={"inherit"}
          onClick={() => {
            navigate("/about");
          }}
        >
          About Us
        </Button>
        <Button
          variant={"inherit"}
          onClick={() => {
            navigate("/academics");
          }}
        >
          Academics
        </Button>
        <Button
          variant={"inherit"}
          onClick={() => {
            navigate("/admissions");
          }}
        >
          Admissions
        </Button>
        <Button
          variant={"inherit"}
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contact
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/student/register");
            }}
          >
            Register
          </Button>
        </div>
        <div style={{ marginRight: 18 }}>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/student/login");
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
