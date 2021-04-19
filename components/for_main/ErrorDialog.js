import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";

const ErrorDialog = () => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const [title, message] = state.dialogText;
  const handleClose = () => {
    dispatch({ type: "TOGGLE_DIALOG", payload: ["", ""] });
  };
  return (
    <Dialog open={state.dialogOpen} onClose={handleClose}>
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${title}-${message}`}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
