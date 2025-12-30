import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Figtree', sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#6708fa",
      light: "#7c86ff",
      dark: "#432dd7",
      contrastText: "rgba(255,255,255,0.87)",
    },
    secondary: {
      main: "#ff4001",
      light: "#ff6c40",
      dark: "#bd2e00",
    },
    success: {
      main: "#00c951",
      light: "#05df72",
      dark: "#008236",
      contrastText: "rgba(255,255,255,0.87)",
    },
    error: {
      main: "#fb2c36",
      light: "#ff6467",
      dark: "#c10007",
      contrastText: "rgba(255,255,255,0.87)",
    },
    warning: {
      main: "#fd9a00",
      light: "#ffba00",
      dark: "#bb4d00",
    },
  },
});

export default theme;
