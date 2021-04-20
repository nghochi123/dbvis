import React, { useContext, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { checkAuthCG } from "../../misc/checkAuth";
import diagrams from "../../misc/knex";
import ErrorDialog from "../../components/for_main/ErrorDialog";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  outerContainer: {
    height: "80vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pushUp: {
    marginTop: "1.5em",
  },
}));

const LogIn = ({ confirmAuth, dbs, maxdbid }) => {
  const newdbid = maxdbid[0].max + 1;
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const authed = checkAuthCG(confirmAuth, state.userid, state.userToken);
  const groupid = state.groupid;
  const filteredDBS = dbs.filter(db=>db.group_id === groupid);
  const [dbnameField, descriptionField] = [useRef(), useRef()];
  const submitHandler = async (e) => {
    e.preventDefault();
    if (authed) {
      const db_name = dbnameField.current.value;
      const description = descriptionField.current.value;
      const existingdb = filteredDBS.find(
        (db) => db.db_name.toLowerCase() === db_name.toLowerCase()
      );
      if (existingdb) {
        return dispatch({
          type: "TOGGLE_DIALOG",
          payload: [
            "Database name in use",
            "Please select another database name to use.",
          ],
        });
      }
      await axios
        .post("/api/adddbtogroup", {
          id: newdbid,
          db_name,
          db_desc: description,
          group_id: groupid
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
      router.push("/db");
    }
  };
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
  let display = <div>You are not logged in. Redirecting to login page.</div>;
  if (authed) {
    display = (
      <Container
        className={classes.outerContainer}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <div className={classes.innerContainer}>
          <Typography component="h1" variant="h5">
            Create a New Database
          </Typography>
          <form className={classes.pushUp} onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dbname"
              label="Database Name"
              autoFocus
              inputRef={dbnameField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              label="Description"
              type="description"
              id="description"
              rows={5}
              inputRef={descriptionField}
            />
            <Button
              className={classes.pushUp}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create Database
            </Button>
          </form>
        </div>
        <ErrorDialog />
      </Container>
    );
  }
  return (
    <>
      {display}
      <ErrorDialog />
    </>
  );
};

export default LogIn;

export const getServerSideProps = async ({ req, query }) => {
  const confirmAuth = await diagrams("user_tokens")
    .join("users", "user_tokens.user_id", "users.id")
    .select();
  const dbs = await diagrams("db").select();
  const maxdbid = await diagrams("db").max("id", { as: "max" });
  return {
    props: {
      confirmAuth: JSON.parse(JSON.stringify(confirmAuth)),
      dbs: JSON.parse(JSON.stringify(dbs)),
      maxdbid: JSON.parse(JSON.stringify(maxdbid)),
    },
  };
};
