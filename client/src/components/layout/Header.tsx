import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AvatarMenu from "./AvatarMenu";
import { DRAWER_WIDTH } from "./Sidebar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  color: "inherit",
  backgroundColor: "white",
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={[
              {
                transition: theme.transitions.create("margin", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                marginRight: open ? 1.5 : 4.5,
              },
            ]}
          >
            {open ? <ChevronLeftRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Kareer Kit
          </Typography>
        </Box>

        <Box component="div" className="space-x-3!">
          <IconButton aria-label="notifications button" size="large">
            <Badge color="secondary" badgeContent={1} overlap="circular">
              <NotificationsNoneRoundedIcon fontSize="medium" />
            </Badge>
          </IconButton>
          <AvatarMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
