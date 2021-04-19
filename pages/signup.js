import React, { useContext, useRef, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import validator from "validator";
import ErrorDialog from "../components/for_main/ErrorDialog";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

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

export default function SignUp() {
  const dispatch = useContext(GlobalDispatchContext);
  const [error, setError] = useState(false);
  const [userField, emailField, passwordField, confirmField] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const classes = useStyles();
  const submitHandler = (e) => {
    e.preventDefault();
    const [username, email, password] = [
      userField.current.value,
      emailField.current.value,
      passwordField.current.value,
    ];
    if (!validator.isAlphanumeric(username)) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Username is invalid",
          "Please enter an alphanumeric username",
        ],
      });
    } else if (!validator.isEmail(email)) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: ["Email is invalid", "Please enter an email"],
      });
    } else if (!validator.isStrongPassword(password)) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Password not strong enough",
          "Please enter a valid password or make it stronger",
        ],
      });
    } else if (!validator.equals(password, confirmField.current.value)) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: ["Passwords do not match", "Please confirm your passwords"],
      });
    } else {
      console.log("good to go!");
    }
  };
  const confirmPassword = () => {
    if (
      passwordField.current.value != confirmField.current.value ||
      !validator.isStrongPassword(passwordField.current.value)
    ) {
      setError(true);
    } else {
      setError(false);
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
          Sign up
        </Typography>
        <form onSubmit={submitHandler} className={classes.pushUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={userField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                inputRef={emailField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                inputRef={passwordField}
                onChange={confirmPassword}
                error={error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                onChange={confirmPassword}
                inputRef={confirmField}
                error={error}
                helperText="Password needs a minimum of 8 characters, 1 symbol, 1 uppercase character and 1 lowercase character"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.pushUp}
          >
            Sign Up
          </Button>
          <Grid className={classes.pushUp} container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ErrorDialog />
    </Container>
  );
}
