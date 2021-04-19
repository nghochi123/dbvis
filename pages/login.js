import React from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme)=>({
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    outerContainer: {
        height: '80vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pushUp: {
        marginTop: '1.5em'
    }
}))

export default function SignIn() {
    const classes = useStyles();
  return (
    <Container className={classes.outerContainer} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.innerContainer}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.pushUp} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
    </Container>
  );
}