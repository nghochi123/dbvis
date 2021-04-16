import React from "react";
import { useDrag } from "react-dnd";
import {makeStyles} from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const style = {
  position: "absolute",
  cursor: "grab",
};

const useStyles = makeStyles((theme)=>({
    mainHeader : {
        margin: 0,
        padding: '0 5px 5px 5px',
        textAlign: 'center',
    }
}))

const TableBox = ({ name, left, top, fields, color }) => {
    const classes = useStyles();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { name, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, left, top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.mainHeader} style={{borderTop: `5px solid hsl(${color}, 50%, 50%)`}} colSpan={2}>{name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.field}>
                <TableCell>{field.field}</TableCell>
                <TableCell align="right">{field.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableBox;
