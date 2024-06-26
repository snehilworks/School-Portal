import { Button, ThemeProvider, createTheme } from "@mui/material";
import { blue, cyan, deepPurple, green, red } from "@mui/material/colors";
import React from "react";

const PrimaryButton = ({
  variant,
  children,
  color,
  extra_styles,
  onClick,
  disabled = false,
}) => {
  const theme = createTheme({
    palette: {
      default: { main: blue["700"], contrastText: "#fff" },
      student: { main: green["500"], contrastText: "#fff" },
      teacher: { main: deepPurple["400"], contrastText: "#fff" },
      logout: { main: red["500"], contrastText: "#fff" },
    },
    components: {
      MuiButton: {
        defaultProps: {
          // disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontFamily: "Poppins",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          disabled={disabled}
          variant={variant || "contained"}
          color={color || "default"}
          style={{ ...extra_styles }}
          onClick={onClick}
        >
          <span className="relative">
            {children}
            <span className="absolute top-0 left-0 w-full h-full rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-transparent to-white opacity-0 hover:opacity-10"></span>
          </span>
        </Button>
      </ThemeProvider>
    </>
  );
};

export default PrimaryButton;