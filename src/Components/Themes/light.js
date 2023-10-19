import { createTheme } from "@mui/material/styles";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
});

export default light;
