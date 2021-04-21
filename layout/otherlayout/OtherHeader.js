import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Menu, MenuItem, Toolbar, IconButton } from "@material-ui/core";
import { Home, Settings } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const OtherHeader = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (link) => (event) => {
    event.preventDefault();
    router.push(link);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar color="primary" position="fixed">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="home"
          className={classes.homeButton}
          onClick={handleClick("/")}
        >
          <Home />
        </IconButton>
        <div>
          <IconButton
            aria-label="settings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Settings />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
            <hr />
            <MenuItem onClick={handleClose}>Advanced Settings</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default OtherHeader;
