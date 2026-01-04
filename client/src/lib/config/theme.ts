import { createTheme } from "@mui/material/styles";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    extraLight?: string; // Add your custom property here
  }
  interface SimplePaletteColorOptions {
    extraLight?: string; // Add to options as well
  }
}
const theme = createTheme({
  typography: {
    fontFamily: "'Figtree', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          fontWeight: 600,
        },
        sizeLarge: {
          height: "40px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "0 !important",
          marginRight: "12px",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#7419ff",
      light: "#9d76ff",
      extraLight: "#d8cfff",
      dark: "#432dd7",
      contrastText: "rgba(255,255,255,0.95)",
    },
    secondary: {
      main: "#ff4001",
      light: "#ff6c40",
      dark: "#bd2e00",
    },
    success: {
      main: "#09de5e",
      light: "#76ffac",
      extraLight: "#eefff4",
      dark: "#00c951",
      contrastText: "rgba(255,255,255,0.95)",
    },
    error: {
      main: "#fb2c36",
      light: "#ff6467",
      dark: "#c10007",
      contrastText: "rgba(255,255,255,0.95)",
    },
    warning: {
      main: "#fd9a00",
      light: "#ffba00",
      dark: "#bb4d00",
    },
  },
});

export default theme;
