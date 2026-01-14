import { createTheme } from "@mui/material/styles";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    slate: PaletteColor;
    violet: PaletteColor;
  }
  interface PaletteColor {
    extraLight?: string; // Add your custom property here
  }
  interface SimplePaletteColorOptions {
    extraLight?: string; // Add to options as well
  }
}
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "'Figtree', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          fontWeight: 600,
        },
        sizeLarge: {
          height: "48px",
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
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: "#EFEFEF",
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
      main: "#ff0000",
      light: "#ff9494",
      extraLight: "#fff0f0",
      dark: "#d70000",
      contrastText: "rgba(255,255,255,0.95)",
    },
    warning: {
      main: "#fd9a00",
      light: "#ffba00",
      dark: "#bb4d00",
    },
    slate: {
      main: "#62748e",
      light: "#f1f5f9",
      extraLight: "#f8fafc",
      dark: "#506079",
      contrastText: "#242105",
    },
    violet: {
      main: "#a684ff",
      light: "#c4b4ff",
      extraLight: "#ddd6ff",
      dark: "#8e51ff",
      contrastText: "rgba(255,255,255,0.95)",
    },
  },
});

export default theme;
