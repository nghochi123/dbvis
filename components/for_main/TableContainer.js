import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import TableBox from "./TableBox";

/*----------------------------Test Data Here------------------------------------- */
import tables from '../../misc/data';

const styles = {
  width: "99vw",
  height: "90vh",
  position: "absolute",
};
const TableContainer = () => {
  const [boxes, setBoxes] = useState(tables);
  const moveBox = useCallback(
    (name, left, top) => {
        let replaceBoxPos = boxes.filter(box=>box.name === name)[0];
        let boxPosWithoutReplaceBoxPos = boxes.filter(box=>box.name !== name);
        replaceBoxPos.left = left;
        replaceBoxPos.top = top;
      setBoxes([...boxPosWithoutReplaceBoxPos, replaceBoxPos]);
    },
    [boxes, setBoxes]
  );
  const [_, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.name, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  return (
    <div ref={drop} style={styles}>
      {boxes.map((item) => {
        const { left, top, name, fields, color, connectedTo } = item;
        return (
          <TableBox
            key={name}
            name={name}
            left={left}
            top={top}
            fields={fields}
            color={color}
            connectedTo={connectedTo}
          />
        );
      })}
    </div>
  );
};

export default TableContainer;
