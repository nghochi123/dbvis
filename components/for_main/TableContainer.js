import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import TableBox from "./TableBox";
import Draggable from "react-draggable";
import {RerenderStateContext} from '../../context/TableContainerForceRerender';

import appDatabase from "../../misc/data";

const tables = appDatabase.groups[0].tables;
const Xarrow = dynamic(() => import("react-xarrows"), { ssr: false });

const styles = {
    width: "99vw",
    height: "90vh",
  };

const TableContainer = () => {
  const line = {
    start: "cats-cat1",
    end: "piss-psiscrap",
    color: "hsl(50, 50%, 50%)",
    path: "grid",
    strokeWidth: 1,
    headSize: 5,
    dashness: { animation: 0 },
    startAnchor: ["left", "right"],
    endAnchor: ["left", "right"],
  };
  const rerender = useContext(RerenderStateContext).toggle;
  const [, setRender] = useState({});
  const forceRerender = () => setRender({});
  console.log(tables)
  return (
    <div style={styles} lmao={rerender}>
      {tables.map(({ name, left, top, fields, color }, i) => (
        <Draggable bounds="parent" onStop={forceRerender} onDrag={forceRerender} key={i}>
          <div id={name} style={{ position: "absolute", maxWidth: '100vw', maxHeight: '100vh', left, top }}>
            <TableBox
              name={name}
              left={left}
              top={top}
              fields={fields}
              color={color}
            />
          </div>
        </Draggable>
      ))}
      <Xarrow {...line} />
    </div>
  );
};

export default TableContainer;
