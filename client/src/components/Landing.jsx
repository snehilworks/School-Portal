import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./../styles/Landing.css";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="Landing-div">
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Shivam Public School, Aarni</Typography>
            <Typography variant={"h5"}>Second home for your child</Typography>
            {
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/student/register");
                    }}
                    style={{ backgroundColor: "#4caf50" }}
                  >
                    Register
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
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
            }
          </div>
          <div>
            {" "}
            <Button
              size={"large"}
              variant={"contained"}
              onClick={() => {
                navigate("/teacher/login");
              }}
              style={{ backgroundColor: "#FFA500", marginTop: 50 }}
            >
              Login For Teachers
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={"/school.jpg"} width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
};
