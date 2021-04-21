import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Typography, Link, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import LandingHeader from "../layout/landinglayout/LandingHeader";
import LandingFooter from '../layout/landinglayout/LandingFooter';

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100vh",
    backgroundColor: "#3F51B5",
    color: "#FFFFFF",
  },
  hero: {
    height: "95vh",
    backgroundColor: "#3F51B5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  innerHero: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxWidth: "1200px",
  },
  pushUp: {
    marginTop: '15px',
  },
  header: {
    textAlign: 'center'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    textAlign: 'center'
  },

}));

const Index = () => {
  const classes = useStyles();
  const router = useRouter();
  const handleClick = (link) => (event) => {
    event.preventDefault();
    router.push(link);
  };
  return (
    <>
    <div className={classes.background}>

      <LandingHeader />
      <div className={classes.hero}>
        <div className={classes.innerHero}>
          <div style={{ width: "50%" }}>
            <Typography variant="h2" component="h2">
              DB Vis
            </Typography>
            <Typography className={classes.pushUp} variant="h5" component="h5">
              Visualise and share your database with others.
            </Typography>
            <Typography className={classes.pushUp} variant="subtitle2" component="p">
              A clone of the popular database visualisation app{" "}
              <Link color="inherit" href="https://drawsql.app">
                DrawSQL
              </Link>
              .
            </Typography>
            <Button onClick={handleClick('/signup')} className={classes.pushUp} variant="contained" color="default">
              Get Started
            </Button>
          </div>
          <div style={{ width: "50%", textAlign: "right" }}>
            <Paper elevation={10}>

              <Image
                src="/HeroPic.png"
                alt="hero pic"
                height={600}
                width={800}
              />
            </Paper>
          </div>
        </div>
      </div>
        <LandingFooter className={classes.footer}/>
    </div>
    </>
  );
};

export default Index;
