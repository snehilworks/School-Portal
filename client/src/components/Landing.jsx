import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./ui/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faGraduationCap, faSchool } from "@fortawesome/free-solid-svg-icons";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white">
      <div className="component-container flex items-start laptop:items-center justify-center">
        <div className="w-full flex flex-col laptop:flex-row items-center justify-between gap-4">
          <div className="order-2 laptop:order-1 h-fit laptop:h-full flex flex-col items-center justify-between">
            <p className="text-[20px] laptop:text-[46px] font-semibold">Shivam Public School, Aarni</p>

            <div className="btns mt-4 laptop:mt-8 w-fit flex flex-col mx-auto items-center laptop:items-start gap-4">
              <PrimaryButton
                extra_styles={{ width: "100%" }}
                onClick={() => {
                  navigate("/student/register");
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2">
                  <FontAwesomeIcon icon={faSchool} className="text-[20px] laptop:text-[36px]" />
                  <p className="text-lg laptop:text-xl">Register</p>
                </div>
              </PrimaryButton>
              <PrimaryButton
                color={"student"}
                onClick={() => {
                  navigate("/student/login");
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-[20px] laptop:text-[36px]" />
                  <p className="text-lg laptop:text-xl">Login for Students</p>
                </div>
              </PrimaryButton>
              <PrimaryButton
                color={"teacher"}
                onClick={() => {
                  navigate("/teacher/login");
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2">
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="text-[20px] laptop:text-[36px]" />
                  <p className="text-lg laptop:text-xl">Login for Faculties</p>
                </div>
              </PrimaryButton>
            </div>
          </div>
          <div className="order-1 laptop:order-2 w-full tablet:w-1/2 rounded-lg overflow-hidden">
            <img src={"/school.jpg"} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
