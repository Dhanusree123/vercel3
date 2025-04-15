import { createTheme } from "@mui/material";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#1a1d1f",
              paper: "#1f2937",
            },
            primary: {
              main: "#6366f1",
            },
          }
        : {
            background: {
              default: "#f3f4f6",
              paper: "#ffffff",
            },
            primary: {
              main: "#4f46e5",
            },
          }),
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
            },
          },
        },
      },
    },
  });

export default getTheme;
