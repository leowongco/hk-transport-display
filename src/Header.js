import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
  ClickAwayListener,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import TrainIcon from "@material-ui/icons/Train";
import "./css/Header.css";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import TramIcon from "@material-ui/icons/Tram";
import appInfo from "../package.json";
import Chip from "@material-ui/core/Chip";

const drawerWidth = 250;

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
          <Typography className="header__title">
            香港鐵路資訊 HK Railway Info
          </Typography>

          <Chip
            size="small"
            color="secondary"
            label="Beta!"
            className="header__chip"
          />
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
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              主頁 Home
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to="/lrt" onClick={handleDrawerClose}>
              <ListItemIcon>
                <TramIcon />
              </ListItemIcon>
              輕鐵 Light Rail
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/mtr" onClick={handleDrawerClose}>
              <ListItemIcon>
                <TrainIcon />
              </ListItemIcon>
              市區線 Urban Lines
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>Version: {appInfo.version}</ListItem>
          <ListItem>
            <a
              href="http://dubdub.pro/"
              target="_blank"
              onClick={handleDrawerClose}
            >
              DubDub Production
            </a>
          </ListItem>
          <ListItem>
            <Button color="secondary" onClick={handleUpdateApp}>
              Refresh App
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
