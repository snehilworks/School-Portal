import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    // <div className="Landing-div">
    //   <Grid container style={{ padding: "5vw" }}>
    //     <Grid item xs={12} md={6} lg={6}>
    //       <div style={{ marginTop: 100 }}>
    //         <Typography variant={"h2"}>Shivam Public School, Aarni</Typography>
    //         <Typography variant={"h5"}>Second home for your child</Typography>
    //         {
    //           <div style={{ display: "flex", marginTop: 20 }}>
    //             <div style={{ marginRight: 10 }}>
    //               <Button
    //                 size={"large"}
    //                 variant={"contained"}
    //                 onClick={() => {
    //                   navigate("/student/register");
    //                 }}
    //                 sx={{ borderRadius: 20, textTransform: "none" }}
    //                 style={{ backgroundColor: "#4caf50" }}
    //               >
    //                 Register
    //               </Button>
    //             </div>
    //             <div>
    //               <Button
    //                 size={"large"}
    //                 variant={"contained"}
    //                 onClick={() => {
    //                   navigate("/student/login");
    //                 }}
    //                 sx={{ borderRadius: 20, textTransform: "none" }}
    //                 style={{ backgroundColor: "#00008B" }}
    //               >
    //                 Login
    //               </Button>
    //             </div>
    //           </div>
    //         }
    //       </div>
    //       <div>
    //         {" "}
    //         <Button
    //           size={"large"}
    //           variant={"contained"}
    //           onClick={() => {
    //             navigate("/teacher/login");
    //           }}
    //           sx={{ borderRadius: 20, textTransform: "none" }}
    //           style={{ backgroundColor: "#00bcd4", marginTop: 50 }}
    //         >
    //           Login For Teachers
    //         </Button>
    //       </div>
    //     </Grid>
    //     <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
    //       <img src={"/school.jpg"} width={"100%"} style={{ borderRadius: 8 }} />
    //     </Grid>
    //   </Grid>
    // </div>
    <div className="w-full h-full bg-black">
      <div className="component-container bg-white">
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-semibold">Shivam Public School, Aarni</p>
          </div>
          <div>
            <img src={"/school.jpg"} width={"100%"} className="w-full tablet:w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
