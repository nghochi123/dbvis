import React from "react";
import { makeStyles } from "@material-ui/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    margin: 0,
    padding: "0 5px 5px 5px",
    textAlign: "center",
  },
}));

const TableBox = ({ id, name, fields, color }) => {
  const classes = useStyles();
  const tableFields = fields.filter(field=>field.table_id === id);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.mainHeader}
              style={{ borderTop: `5px solid hsl(${color}, 50%, 50%)` }}
              colSpan={2}
            >
              {name}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableFields.map((field) => (
            <TableRow id={field.field_name} key={field.field_name}>
              <TableCell>{field.field}</TableCell>
              <TableCell align="right">{field.field_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBox;
