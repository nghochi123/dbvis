import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const ConfirmDelete = ({openState, response, setOpenState}) => {
    const handleClose = () => {
        setOpenState(false);
    }
    const handleYes = () => {
        setOpenState(false);
        response(true);
    }
    const handleNo = () => {
        setOpenState(false);
        response(false);
    }
  return (
    <Dialog open={openState} onClose={handleClose}>
      <DialogTitle id="DeleteDialog">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="DeleteDialogContent">
          You have clicked delete. Confirm deletion?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button onClick={handleNo} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
