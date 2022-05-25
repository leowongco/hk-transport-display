import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";

import {
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  IconButton,
  Toolbar,
  Typography,
  ListItem,
} from "@mui/material";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import TrainIcon from "@material-ui/icons/Train";
import Logo from "./img/icon.png";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import TramIcon from "@material-ui/icons/Tram";
import SettingsIcon from "@material-ui/icons/Settings";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import "./css/Header.css";
import { Link } from "react-router-dom";
import appInfo from "../package.json";

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleUpdateApp = () => {
    window.location.reload();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <AppBar position="static" className="header__appBar">
        <Toolbar>
          <IconButton
            edge="start"
            className="header__iconBtn"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="HK Railway Info Logo" height="40px" />

          <Typography className="header__title">
            <Link to="/">香港鐵路資訊 HK Railway Info</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <Link to="/" onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  主頁 Home
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to="/mtr-status" onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <CheckCircleIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  港鐵狀態 MTR Status
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/lrt" onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <TramIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  輕鐵 Light Rail
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={"/mtr/l/s"} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <TrainIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  市區線 Urban Lines
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={"/mtrbus"} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsBusIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  港鐵巴士 MTR Bus
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to={"/hktram"} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <TramIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  香港電車 HK Tramways
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to={"/settings"} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Typography variant="button" noWrap>
                  設定 Settings
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List className="bottomController">
          <ListItem>
            <Typography variant="button" noWrap>
              Version: {appInfo.version}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="button" noWrap>
              <a
                href="http://dubdub.pro/"
                target="_blank"
                rel="noreferrer"
                onClick={handleDrawerClose}
              >
                DubDub Production
              </a>
            </Typography>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<CachedIcon />}
              size="small"
              color="secondary"
              onClick={() => handleUpdateApp()}
            >
              <Typography variant="button" noWrap>
                重新整理 Refresh
              </Typography>
            </Button>
            {/* <Button onClick={() => demoButton()} disabled>
              <DeveloperModeIcon />
            </Button> */}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
