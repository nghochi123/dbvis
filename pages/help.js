import React from "react";
import LandingLayout from "../layout/landinglayout/LandingLayout";
import Head from "next/head";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  Paper,
  Link,
} from "@material-ui/core";
import helptext from "../misc/helptext";

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: "10vh",
    marginLeft: "300px",
    width: "calc((100% - 300px) * 0.6)",
  },
  drawer: {
    width: "300px",
    zIndex: 0,
  },
  drawerPaper: {
    width: "300px",
    zIndex: 0,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "8vh",
  },
  text: {
    fontSize: "1.3rem",
    margin: "20px 0",
  },
  section: {
    margin: "20px",
  },
}));

const Help = () => {
  const classes = useStyles();
  const helpBody = helptext.map((section) => {
    if (section.text || section.image) {
      return (
        <div className={classes.section}>
          {section.header ? (
            <Typography
              id={section.header.split(" ").join("_")}
              variant={section.header === "Introduction" ? "h2" : "h3"}
            >
              {section.header}
            </Typography>
          ) : null}
          <Typography variant="body1" className={classes.text}>
            {section.text}
          </Typography>
          {section.image ? (
            <Paper elevation={1}>
              <img
                src={section.image}
                alt={section.image}
                width={"100%"}
                style={{ borderRadius: "5px" }}
              />
            </Paper>
          ) : null}
        </div>
      );
    }
  });
  const helpSidebar = helptext.map((section) => {
    if (section.header && section.text) {
      return (
        <ListItem>
          <Link href={`#${section.header.split(" ").join("_")}`}>
            <Typography variant="body1">{section.header}</Typography>
          </Link>
        </ListItem>
      );
    } else if (section.header) {
      return (
        <ListItem>
          <Typography variant="h5">{section.header}</Typography>
        </ListItem>
      );
    }
  });
  return (
    <LandingLayout>
      <Head>
        <title>Help</title>
      </Head>
      <div className={classes.body}>{helpBody}</div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <Typography variant="h4">DB Vis</Typography>
            </ListItem>
            {helpSidebar}
          </List>
        </div>
      </Drawer>
    </LandingLayout>
  );
};

export default Help;
