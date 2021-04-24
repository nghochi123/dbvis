import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import TableBox from "./TableBox";
import Draggable from "react-draggable";
import { RerenderStateContext } from "../../context/TableContainerForceRerender";
import { GlobalStateContext } from "../../context/GlobalContextProvider";

const Xarrow = dynamic(() => import("react-xarrows"), { ssr: false });

const styles = {
  width: "99vw",
  height: "90vh",
};

const TableContainer = ({ tables, fields, arrows }) => {
  const state = useContext(GlobalStateContext);
  const refArr = useRef([]);
  useEffect(() => {
    refArr.current = refArr.current.slice(0, tables.length);
  }, [tables]);
  const lines = arrows.map((arrow) => {
    return {
      start: arrow.arrow_from,
      end: arrow.arrow_to,
      color: `hsl(${arrow.color}, 50%, 50%)`,
      path: "grid",
      strokeWidth: 1,
      headSize: 2,
      dashness: { animation: 0 },
      startAnchor: ["left", "right"],
      endAnchor: ["left", "right"],
    };
  });
  const rerender = useContext(RerenderStateContext).toggle;
  const [, setRender] = useState({});
  const forceRerender = () => setRender({});
  const handleStop = (i, id) => async (e) => {
    if (state.dbid !== -1) {
      await axios
        .post("/api/updateposition", {
          id,
          x: refArr.current[i].state.x,
          y: refArr.current[i].state.y,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
    setRender({});
  };
  return (
    <div style={styles} lmao={rerender}>
      {tables.map(({ id, tbl_name, _left, _top, color }, i) => {
        return (
          <Draggable
            bounds="parent"
            ref={(item) => (refArr.current[i] = item)}
            onStop={handleStop(i, id)}
            onDrag={forceRerender}
            key={`${i}-${id}-${tbl_name}`}
            defaultPosition={{ x: _left, y: _top }}
          >
            <div
              id={id}
              style={{
                position: "absolute",
                maxWidth: "100vw",
                maxHeight: "100vh",
              }}
            >
              <TableBox id={id} name={tbl_name} fields={fields} color={color} />
            </div>
          </Draggable>
        );
      })}
      {lines.map((line) => {
        return <Xarrow key={`${line.start}-${line.end}`} {...line} />;
      })}
    </div>
  );
};

export default TableContainer;
