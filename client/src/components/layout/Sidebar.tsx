import { styled, type Theme, type CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router";
import { navLinks } from "../../lib/config/nav";
import ContextSwitcher from "./ContextSwitcher";

export const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100dvh",
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type SidebarProps = {
  open: boolean;
};
export default function Sidebar({ open }: SidebarProps) {
  return (
    <Drawer variant="permanent" open={open}>
      <div>
        <DrawerHeader sx={{ px: 0, width: "100%" }}>
          <ContextSwitcher />
        </DrawerHeader>
        <Divider />
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navLinks.map((nav) => (
            <NavLink to={nav.path} key={nav.name}>
              {({ isActive }) => (
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    px: 1,
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      py: 0,
                      justifyContent: open ? "initial" : "center",
                      backgroundColor: isActive
                        ? "primary.main"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isActive
                          ? "primary.dark"
                          : "rgba(0,0,0,0.04)",
                      },
                      borderRadius: 3,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        mr: open ? 3 : "auto",
                        color: isActive ? "white" : "inherit",
                      }}
                    >
                      <nav.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={nav.name}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isActive ? "white" : "inherit",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>

        <Divider />
      </div>

      {open && (
        <footer className="px-5 py-3 text-sm transition-all delay-200 text-gray-500 border-t">
          from{" "}
          <a
            href="https://clinoae.is-a.dev"
            target="_blank"
            className="text-primary"
          >
            clinoae
          </a>
        </footer>
      )}
    </Drawer>
  );
}
