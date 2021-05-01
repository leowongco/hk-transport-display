import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import TrainIcon from "@material-ui/icons/Train";
import "./css/Header.css";

function Header() {
  return (
    <div className="header">
      <AppBar position="static" className="header__appBar">
        <Toolbar>
          <IconButton
            edge="start"
            className="header__iconBtn"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="header__title">
            <TrainIcon /> 鉄道ご案内
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
