import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

import diagrams from "../misc/knex";
import {checkAuthDB} from "../misc/checkAuth";
import ErrorDialog from "../components/for_main/ErrorDialog";
import OtherHeader from '../layout/otherlayout/OtherHeader';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  outerContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
      width: "40vw",
      border: '2px solid #dfdfdf'
  },
  listItem: {
    textAlign: 'center',
  },
  pushUp: {
    marginTop: "1.5em",
  },
}));

const Groups = ({ dbs, confirmAuth }) => {
console.log(dbs);
  const router = useRouter();
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const authed = checkAuthDB(dbs, confirmAuth, state.userid, state.userToken, state.groupid);
  const classes = useStyles();
  const redirectHandler = (dbid) => (event) =>{
    dispatch({
      type: 'SET_DBID',
      payload: dbid,
    })
    router.push('/mainpage');
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
    const dbs = authed;
    display = (
      <List component="nav" className={classes.list}>
        {dbs.map((db) => (
          <>
            <ListItem button onClick={redirectHandler(db.id)} className={classes.listItem}>
              <ListItemText primary={db.db_name}/>
            </ListItem>
          </>
        ))}
      </List>
    );
    if(dbs.length===0){
        display = (
            <p>There are no databases in this group at the moment.</p>
        )
    }
  }
  return (
    <div className={classes.outerContainer}>
        <OtherHeader/>
        <div className={classes.innerContainer}>
        
        <h1>Databases in this group:</h1>
        {display}

        </div>
      
      <ErrorDialog />
    </div>
  );
};

export default Groups;

export const getServerSideProps = async ({ req, query }) => {
  const dbs = await diagrams("grp")
    .join('db', 'db.group_id', 'grp.id')
    .select('db.id', 'group_name', 'group_id', 'db_name');
  const confirmAuth = await diagrams("users")
    .join("user_tokens", "user_tokens.user_id", "users.id")
    .select();
  return {
    props: {
      dbs: JSON.parse(JSON.stringify(dbs)),
      confirmAuth: JSON.parse(JSON.stringify(confirmAuth)),
    },
  };
};
