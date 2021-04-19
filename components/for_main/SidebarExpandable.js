import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { RerenderStateContext } from "../../context/TableContainerForceRerender";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { GlobalDispatchContext } from "../../context/GlobalContextProvider";

const SidebarExpandable = (props) => {
  const rerender = useContext(RerenderStateContext).toggle;
  const dispatch = useContext(GlobalDispatchContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 0,
    },
    textField: {
      display: "flex",
      padding: "0 10px 5px 10px",
      borderLeft: `7px solid hsl(${props.color}, 50%, 50%)`,
    },
    textItem: {
      margin: "0 5px",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fieldField, dataField, keyField, connectionField] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const handleAddField = async (event) => {
    event.preventDefault();
    const checkString = /[A-z1-9]+\-[A-z1-9]+/;
    if (
      keyField.current.value === "F" &&
      !connectionField.current.value.match(checkString)
    ) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Error - Bad Input",
          "Please check whether the format of your connection field is correct. The correct format would be [table name]-[field name], where the table name and field name are of the field you wish to connect this field to.",
        ],
      });
    }
    else{
      props.fieldAdder(
        props.children,
        {
          field: fieldField.current.value,
          field_type: dataField.current.value,
          field_key:
            keyField.current.value === "F"
              ? `${keyField.current.value}(${connectionField.current.value})`
              : keyField.current.value,
        },
        props.db_id,
        props.table_id,
        fieldField.current.value
      );
      fieldField.current.value = "";
      dataField.current.value = "";
      connectionField.current.value = "-";
    }
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem
        button
        key={props.children}
        onClick={handleOpen}
        style={{ borderLeft: `7px solid hsl(${props.color}, 50%, 50%)` }}
      >
        <ListItemText primary={props.children} />
        <ListItemIcon className={classes.root}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </ListItemIcon>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <Table
            aria-label={props.children}
            style={{ borderLeft: `7px solid hsl(${props.color}, 50%, 50%)` }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Data Type</TableCell>
                <TableCell align="right">Connection</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.fields.map((row) => (
                <TableRow key={row.field_name}>
                  <TableCell>{row.field}</TableCell>
                  <TableCell align="right">{row.field_type}</TableCell>
                  <TableCell align="right">{row.field_key}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <form onSubmit={handleAddField}>
          <div className={classes.textField}>
            <TextField
              inputRef={fieldField}
              className={classes.textItem}
              placeholder="Field"
              required
            />
            <TextField
              inputRef={dataField}
              className={classes.textItem}
              placeholder="Data Type"
              required
            />
            <div style={{ display: "flex" }}>
              <Select defaultValue={"-"} inputRef={keyField}>
                <MenuItem value={"-"}>-</MenuItem>
                <MenuItem value={"P"}>P</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
              <TextField
                inputRef={connectionField}
                className={classes.textItem}
                placeholder="Connection"
                defaultValue="-"
                required
              />
            </div>
          </div>
          <div className={classes.textField}>
            <Button type="submit" variant="outlined" fullWidth color="default">
              Add to table
            </Button>
          </div>
        </form>
      </Collapse>
    </>
  );
};

export default SidebarExpandable;
