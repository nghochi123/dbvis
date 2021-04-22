import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";
import { GridOn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
  },
  link: {
    display: "flex",
    alignItems: "center",
  },
  betweenLink: {
    margin: "0 10px",
  },
}));

const LandingHeader = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const clickHandler = (route) => (e) => {
    e.preventDefault();
    router.push(route);
  };
  return (
    <AppBar color="primary" position="fixed" className={classes.appBar}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div className={classes.link}>
          <Link onClick={clickHandler("/")} color="inherit" href="/">
            <GridOn />
          </Link>
          <Link onClick={clickHandler("/")} color="inherit" href="/">
            <h3 className={classes.betweenLink}>DB Vis</h3>
          </Link>
          <Link onClick={clickHandler("/help")} color="inherit" href="/help">
            <p className={classes.betweenLink}>Help</p>
          </Link>
          <Link
            color="inherit"
            onClick={(e) =>{
              e.preventDefault();
              window.open(
                "https://github.com/nghochi123/sqldiagrams/blob/main/README.md",
                "_blank"
              )}
            }
            href="https://github.com/nghochi123/sqldiagrams/blob/main/README.md"
          >
            <p className={classes.betweenLink}>About</p>
          </Link>
          <Link
            onClick={clickHandler("/groups")}
            color="inherit"
            href="/groups"
          >
            <p className={classes.betweenLink}>Your Groups</p>
          </Link>
        </div>
        <div className={classes.link}>
          <Link onClick={clickHandler("/guest")} color="inherit" href="/guest">
            <p className={classes.betweenLink}>Use as Guest</p>
          </Link>
          <Link
            onClick={clickHandler("/signup")}
            color="inherit"
            href="/signup"
          >
            <p className={classes.betweenLink}>Sign Up</p>
          </Link>
          <Link onClick={clickHandler("/login")} color="inherit" href="/login">
            <p className={classes.betweenLink}>Log in</p>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default LandingHeader;
