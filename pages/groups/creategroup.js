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

const LogIn = ({ confirmAuth, groups, maxGroupID }) => {
  const newGroupId = maxGroupID[0].max + 1;
  console.log(newGroupId);
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const authed = checkAuthCG(confirmAuth, state.userid, state.userToken);
  const [groupnameField, descriptionField] = [useRef(), useRef()];
  const submitHandler = async (e) => {
    e.preventDefault();
    if (authed) {
      const group_name = groupnameField.current.value;
      const description = descriptionField.current.value;
      const existingGroup = groups.find(
        (group) => group.group_name.toLowerCase() === group_name.toLowerCase()
      );
      if (existingGroup) {
        return dispatch({
          type: "TOGGLE_DIALOG",
          payload: [
            "Group name in use",
            "Please select another group name to use.",
          ],
        });
      }
      await axios
        .post("/api/addgroup", {
          id: newGroupId,
          group_name,
          group_desc: description,
          owner_id: state.userid,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
      await axios
        .post("/api/addusertogroup", {
          userid: state.userid,
          groupid: newGroupId,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
      router.push("/groups");
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
            Create a New Group
          </Typography>
          <form className={classes.pushUp} onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="groupname"
              label="Group Name"
              autoFocus
              inputRef={groupnameField}
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
              Create Group
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
  const groups = await diagrams("grp").select();
  const maxGroupID = await diagrams("grp").max("id", { as: "max" });
  return {
    props: {
      confirmAuth: JSON.parse(JSON.stringify(confirmAuth)),
      groups: JSON.parse(JSON.stringify(groups)),
      maxGroupID: JSON.parse(JSON.stringify(maxGroupID)),
    },
  };
};
