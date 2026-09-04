/**
 * This file contains custom theme configurations for MUI Library.
 * The exported theme is provided on the flobal theme provider.
 *
 */
import { createTheme } from "@mui/material/styles";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    slate: PaletteColor;
    violet: PaletteColor;
  }

  interface PaletteColor {
    extraLight?: string;
  }

  interface SimplePaletteColorOptions {
    extraLight?: string;
  }

  interface TypographyVariants {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
  }

  interface TypographyVariantsOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
  }
}
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "'Figtree', sans-serif",
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const colorProp = ownerState.color || "primary";

          const paletteColor =
            colorProp in theme.palette
              ? theme.palette[colorProp as keyof typeof theme.palette]
              : theme.palette.primary;

          const isColorObject =
            paletteColor &&
            typeof paletteColor === "object" &&
            "main" in paletteColor;

          const activeBg = isColorObject
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (paletteColor as any).main
            : theme.palette.primary.main;
          const activeText = isColorObject
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (paletteColor as any).contrastText
            : "#fff";

          return {
            ...(ownerState.loading && {
              opacity: 0.75,
            }),

            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
            fontWeight: "semiBold",

            "&.MuiButton-contained.Mui-disabled": {
              backgroundColor: activeBg,
              color: activeText,
              opacity: 0.6,
            },
            "&.MuiButton-outlined.Mui-disabled": {
              borderColor: activeBg,
              color: activeBg,
              opacity: 0.6,
            },
            "&.MuiButton-text.Mui-disabled": {
              color: activeBg,
              opacity: 0.6,
            },
          };
        },
        sizeLarge: {
          height: "48px",
          fontSize: "16px",
        },
        sizeMedium: {
          fontSize: "16px",
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
      extraLight: "#fff7ed",
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
      extraLight: "#fff3e0",
      dark: "#bb4d00",
      contrastText: "#000000",
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
