import React from "react";
import LandingLayout from "../layout/landinglayout/LandingLayout";
import { makeStyles } from "@material-ui/styles";
import { Typography, Drawer, List, ListItem } from "@material-ui/core";
import helptext from "../misc/helptext";

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: "10vh",
    marginLeft: "300px",
    width: "calc((100%-300px) * 0.6)",
  },
  drawer: {
    width: "300px",
    zIndex: -1,
  },
  drawerPaper: {
    width: "300px",
    zIndex: -1,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "8vh",
  },
  text: {
    fontSize: "1.3rem",
    margin: '20px 0'
  },
  section:{
      margin: '20px'
  }
}));

const Help = () => {
  const classes = useStyles();
  const helpBody = helptext.map((section) => {
    if (section.text) {
      return (
        <div className={classes.section}>
          {section.header ? <Typography variant={section.header === 'Introduction' ? 'h2' : 'h3'}>{section.header}</Typography> : null}
          <Typography variant="body1" className={classes.text}>
            {section.text}
          </Typography>
          {section.image ? <img src={section.image} alt={section.image} width={'100%'}/> : null}
        </div>
      );
    }
  });
  return (
    <LandingLayout>
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
            <ListItem>
              <Typography variant="body1">DB Vis</Typography>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </LandingLayout>
  );
};

export default Help;
