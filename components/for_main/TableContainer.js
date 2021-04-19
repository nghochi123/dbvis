import React, { useState, useContext, useRef } from "react";
import axios from 'axios';
import dynamic from "next/dynamic";
import TableBox from "./TableBox";
import Draggable from "react-draggable";
import {RerenderStateContext} from '../../context/TableContainerForceRerender';

const Xarrow = dynamic(() => import("react-xarrows"), { ssr: false });

const styles = {
    width: "99vw",
    height: "90vh",
  };

const TableContainer = ({tables, fields, arrows}) => {
  const lines = arrows.map(arrow => {
    return ({
      start: arrow.arrow_from,
      end: arrow.arrow_to,
      color: `hsl(${arrow.color}, 50%, 50%)`,
      path: "grid",
      strokeWidth: 1,
      headSize: 2,
      dashness: {animation: 0},
      startAnchor: ["left", "right"],
      endAnchor: ["left", "right"],
    })
  })
  const rerender = useContext(RerenderStateContext).toggle;
  const [, setRender] = useState({});
  const forceRerender = () => setRender({});
  const refArr = tables.map(i=>useRef());
  const handleStop = (i, id) => async () => {
    await axios
          .post("/api/updateposition", {id, x: refArr[i].current.state.x, y: refArr[i].current.state.y })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
    setRender({});
  }
  return (
    <div style={styles} lmao={rerender}>
      {tables.map(({id, tbl_name, _left, _top, color }, i) => {
        return (
        <Draggable bounds="parent" ref={refArr[i]} onStop={handleStop(i, id)} onDrag={forceRerender} key={`${i}-${id}-${tbl_name}`} defaultPosition={{x:_left, y:_top}} >
          <div id={id} style={{ position: "absolute", maxWidth: '100vw', maxHeight: '100vh'}}>
            <TableBox
              id={id}
              name={tbl_name}
              fields={fields}
              color={color}
            />
          </div>
        </Draggable>
      )})}
      {lines.map(line => {
        return (
          <Xarrow {...line}/>
        )
      })}
    </div>
  );
};

export default TableContainer;


