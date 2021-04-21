import React from "react";
import {useRouter} from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Tooltip, IconButton, Link } from "@material-ui/core";
import { GridOn, GitHub } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
  },
  betweenLink: {
    margin: "0 10px",
  },
  icon: {
    color: "inherit",
  },
}));

const LandingFooter = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const clickHandler=(route)=>(e)=>{
    e.preventDefault();
    router.push(route);
  }
  return (
    <Container>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link onClick={clickHandler('/')} href="/" color="inherit">
              <GridOn />
            </Link>
            <p style={{ marginLeft: "10px" }}>
              DB Vis | 2021 | Made for educational purposes
            </p>
          </div>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Tooltip title="GitHub Source Code">
            <IconButton
              className={classes.icon}
              onClick={() =>
                window.open(
                  "https://github.com/nghochi123/sqldiagrams",
                  "_blank"
                )
              }
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingFooter;
