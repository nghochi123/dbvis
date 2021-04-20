import React, { useContext, useRef } from "react";
import { useRouter } from "next/router";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import diagrams from "../misc/knex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorDialog from "../components/for_main/ErrorDialog";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";
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

const LogIn = ({ users }) => {
  const classes = useStyles();
  const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
  const router = useRouter();
  const dispatch = useContext(GlobalDispatchContext);
  const [userField, passwordField] = [useRef(), useRef()];
  const submitHandler = async (e) => {
    console.log(JWT_SECRET);
    e.preventDefault();
    const [username, password] = [
      userField.current.value,
      passwordField.current.value,
    ];
    const user = users.find((user) => user.username === username);
    let match;
    if (user) match = await bcrypt.compare(password, user.password);
    if (!match) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: ["Invalid User", "Username or password is incorrect."],
      });
    } else {
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: "2 days",
      });
      const payload = {
        user_id: user.id,
        token,
        expiry_date: new Date(new Date().getTime() + (2 * 24 + 8) * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      };
      await axios
        .post("/api/addtoken", payload)
        .then((res) => {
            dispatch({
                type: 'SET_USER_TOKEN',
                payload: res.data.token
            });
            dispatch({
                type: 'SET_USERID',
                payload: user.id
            })
        })
        .catch((e) => console.log(e));
      router.push("/groups");
    }
  };
  return (
    <Container
      className={classes.outerContainer}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className={classes.innerContainer}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.pushUp} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            autoFocus
            inputRef={userField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            inputRef={passwordField}
          />
          <Button
            className={classes.pushUp}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid className={classes.pushUp} container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Reset Password
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ErrorDialog />
    </Container>
  );
};

export default LogIn;

export const getServerSideProps = async ({ req, query }) => {
  const users = await diagrams("users").select();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
