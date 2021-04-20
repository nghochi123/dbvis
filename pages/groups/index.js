import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, ListItemText, Fab, Typography } from "@material-ui/core";
import {Add} from '@material-ui/icons';

import diagrams from "../../misc/knex";
import { checkAuth } from "../../misc/checkAuth";
import ErrorDialog from "../../components/for_main/ErrorDialog";
import OtherHeader from "../../layout/otherlayout/OtherHeader";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  outerContainer: {
    height: "90vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    width: "40vw",
    border: "2px solid #dfdfdf",
  },
  listItem: {
    textAlign: "center",
  },
  pushUp: {
    marginTop: "1.5em",
  },
  fab: {
    position: 'absolute',
    bottom: '3vw',
    right: '3vh',
  }
}));

const Groups = ({ groups, confirmAuth }) => {
  const router = useRouter();
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const authed = checkAuth(groups, confirmAuth, state.userid, state.userToken);
  const classes = useStyles();
  const redirectHandler = (group_id) => (event) => {
    dispatch({
      type: "SET_GROUPID",
      payload: group_id,
    });
    router.push("/db");
  };
  const fabHandler = (e) =>{
    router.push("/groups/creategroup")
  }
  useEffect(() => {
    if (!authed) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Not logged in",
          "Please log in or sign up, or use the guest page. Redirecting to login page",
        ],
      });
      setTimeout(() => {
        router.push("/login");
        dispatch({
          type: "TOGGLE_DIALOG",
          payload: [
            "Not logged in",
            "Please log in or sign up, or use the guest page. Redirecting to login page",
          ],
        });
      }, 1000);
    }
  }, []);
  let display = <p>You are not logged in.</p>;
  if (authed) {
    const groups = authed;
    display = (
      <List component="nav" className={classes.list}>
        {groups.map((group) => (
          <>
            <ListItem
              button
              onClick={redirectHandler(group.groupid)}
              className={classes.listItem}
            >
              <ListItemText
                primary={`${group.group_name}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Owner: {group.username}
                    </Typography>
                    <br/>
                    {group.group_desc}
                  </>
                }
              />
            </ListItem>
          </>
        ))}
      </List>
    );
  }
  if (groups.length === 0) {
    display = <p>There are no groups you have access to at the moment.</p>;
  }
  return (
    <div>

    <div className={classes.outerContainer}>
      <OtherHeader />
      <div className={classes.innerContainer}>
        <h1>Groups you are part of:</h1>
        {display}
      </div>
      <ErrorDialog />
    </div>
      <Fab variant="extended" color="primary" className={classes.fab} onClick={fabHandler}>
        <Add/>
        New Group
      </Fab>
    </div>
  );
};

export default Groups;

export const getServerSideProps = async ({ req, query }) => {
  const groups = await diagrams("group_user")
    .join("grp", "grp.id", "group_user.groupid")
    .join("users", "grp.owner_id", "users.id")
    .select();
  const confirmAuth = await diagrams("users")
    .join("user_tokens", "user_tokens.user_id", "users.id")
    .select();
  return {
    props: {
      groups: JSON.parse(JSON.stringify(groups)),
      confirmAuth: JSON.parse(JSON.stringify(confirmAuth)),
    },
  };
};
