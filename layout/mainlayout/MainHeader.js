import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import {
  AccountCircle,
  Home,
  Storage,
  PeopleAlt,
  Settings,
} from "@material-ui/icons";

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
    cursor: "pointer",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const MainHeader = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (link) => (event) => {
    event.preventDefault();
    router.push(link);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar className={props.headerClass} color="primary" position="fixed">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="home"
          className={classes.homeButton}
          onClick={handleClick("/")}
        >
          <Home />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb" color="inherit">
          <Link
            color="inherit"
            onClick={handleClick("/groups")}
            className={classes.link}
          >
            <AccountCircle className={classes.icon} />
            {props.username}
          </Link>
          <Link
            color="inherit"
            onClick={handleClick("/db")}
            className={classes.link}
          >
            <PeopleAlt className={classes.icon} />
            {props.groupname}
          </Link>
          <p style={{ display: "flex" }}>
            <Storage className={classes.icon} />
            {props.dbname}
          </p>
        </Breadcrumbs>
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
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
            <hr />
            <MenuItem onClick={handleClose}>Advanced Settings</MenuItem> */}
            <MenuItem onClick={handleClose}>To be added</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
