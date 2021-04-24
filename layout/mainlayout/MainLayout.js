import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import { ChevronLeft, Menu } from "@material-ui/icons";
import axios from "axios";
import { RerenderDispatchContext } from "../../context/TableContainerForceRerender";

import SidebarExpandable from "../../components/for_main/SidebarExpandable";
import MainHeader from "./MainHeader";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  textField: {
    display: "flex",
    padding: "0 10px 0 10px",
  },
  formField: {
    display: "flex",
  },
}));

const MainLayout = (props) => {
  const rerender = useContext(RerenderDispatchContext);
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  const dbinfo = props.breadcrumbinfo.find((db) => state.dbid === db.id);
  const [username, groupname, dbname] = [
    dbinfo.username,
    dbinfo.group_name,
    dbinfo.db_name,
  ];
  const classes = useStyles();
  const table = props.tables.map((table) => {
    return {
      id: table.id,
      name: table.tbl_name,
      tbl_name: table.tbl_name,
      color: table.color,
      fields: props.fields.filter((field) => field.table_id === table.id),
      order: table.id,
      _top: table._top,
      _left: table._left,
      db_id: table.db_id,
    };
  });
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState(table);
  console.log(tables, props.tables, props.fields, props.arrows)

  const tableAdderHandler = async (event) => {
    event.preventDefault();
    const tbl = {
      id: props.maxtableid[0].maxid + 1,
      name: tableNameField.current.value,
      tbl_name: tableNameField.current.value,
      color: Math.random() * 100,
      fields: [],
      order: props.maxtableid[0].maxid + 1,
      _top: 500,
      _left: 500,
      db_id: props.dbid,
    };
    const newTables = [...tables, tbl];
    setTables(newTables);
    tableNameField.current.value = "";
    if (props.dbid !== -1) {
      await axios
        .post("/api/addtable", {
          id: props.maxtableid[0].maxid + 1,
          tbl_name: tbl.name,
          color: tbl.color,
          _top: tbl._top,
          _left: tbl._left,
          db_id: props.dbid,
        })
    } else {
      props.settables([
        ...props.tables,
        {
          id: props.maxtableid[0].maxid + 1,
          tbl_name: tbl.name,
          color: tbl.color,
          _top: tbl._top,
          _left: tbl._left,
          db_id: props.dbid,
        },
      ]);
    }
    rerender({ type: "FORCE_RERENDER" });
    props.refresh();
  };

  const tableDeleteHandler = async (table_id) => {
    
    const newTables = tables.filter(table => table.id !== table_id);
    setTables(newTables);
    if (props.dbid !== -1) {
      await axios.post("/api/deletetable", {
        id: table_id
      })
    }
    else{
      const tableToDelete = tables.find(table=>table.id===table.id)
      props.settables(newTables);
      props.setarrows(props.arrows.filter(arrow=> !arrow.arrow_from.includes(tableToDelete.tbl_name) && !arrow.arrow_to.includes(tableToDelete.tbl_name)))
    }
    rerender({ type: "FORCE_RERENDER" });
    props.refresh();
  }

  const fieldAdderHandler = async (name, field, db_id, table_id, fieldname) => {
    const concat_dbname = props.dbname.find((item) => item.db_id === db_id)
      .concat_dbname;
    const newname = `${concat_dbname}-${name}-${fieldname}`;
    const connection = field.field_key
      .replace("F(", "")
      .replace(")", "")
      .split("-");
    const connectionField = `${concat_dbname}-${connection[0]}-${connection[1]}`;
    if (props.fields.find((field) => field.field_name === newname)) {
      dispatch({
        type: "TOGGLE_DIALOG",
        payload: [
          "Error - Bad Input",
          "Please check the name of your field. There cannot be more than one field of the same name in the same table",
        ],
      });
    } else {
      //Force rerender in table container
      if (field.field_key.startsWith("F")) {
        if (
          !props.fields.find((field) => field.field_name === connectionField)
        ) {
          return dispatch({
            type: "TOGGLE_DIALOG",
            payload: [
              "Error - Bad Input",
              "Please check whether your connection field is inputted correctly. You cannot connect to a field which is not present. The correct format would be [table name]-[field name], where the table name and field name are of the field you wish to connect this field to.",
            ],
          });
        } else {
          let tableToChange = tables.filter((table) => table.name === name)[0];
          const tableArray = tables.filter((table) => table.name !== name);
          tableToChange.fields.push({...field, field_name: newname, table_id}); //field is an object with field, type, key
          const finalTable = [...tableArray, tableToChange].sort(
            (a, b) => a.order - b.order
          );
          setTables(finalTable);
          if (props.dbid !== -1) {
            await axios
              .post("/api/addfield", {
                ...field,
                field_name: newname,
                table_id,
              })
            await axios
              .post("/api/addconnection", {
                arrow_from: newname,
                arrow_to: connectionField,
              })
          } else {
            props.setfields([
              ...props.fields,
              {
                ...field,
                field_name: newname,
                table_id,
                tbl_name: tableToChange.tbl_name,
                color: tableToChange.color,
                _top: tableToChange._top,
                _left: tableToChange._left,
                db_id: -1,
              },
            ]);
            props.setarrows([
              ...props.arrows,
              {
                arrow_from: newname,
                arrow_to: connectionField,
                field_name: newname,
                ...field,
                table_id,
                tbl_name: tableToChange.tbl_name,
                color: tableToChange.color,
                _top: tableToChange._top,
                _left: tableToChange._left,
                db_id: -1,
              },
            ]);
          }
          rerender({ type: "FORCE_RERENDER" });
          props.refresh();
        }
      } else {
        let tableToChange = tables.filter((table) => table.name === name)[0];
        const tableArray = tables.filter((table) => table.name !== name);
        tableToChange.fields.push({ ...field, field_name: newname, table_id }); //field is an object with field, type, key
        const finalTable = [...tableArray, tableToChange].sort(
          (a, b) => a.order - b.order
        );
        setTables(finalTable);
        if (props.dbid !== -1) {
          await axios
            .post("/api/addfield", { ...field, field_name: newname, table_id })
        } else {
          props.setfields([
            ...props.fields,
            {
              ...field,
              field_name: newname,
              table_id,
              tbl_name: tableToChange.tbl_name,
              color: tableToChange.color,
              _top: tableToChange._top,
              _left: tableToChange._left,
              db_id: -1,
            },
          ]);
        }
        rerender({ type: "FORCE_RERENDER" });
        props.refresh();
      }
    }
  };
  const deleteFieldHandler = async (field_name, table_id) => {
    const tableToChange = tables.find((table) => table.id === table_id);
    const remainingTables = tables.filter((table) => table.id !== table_id);
    const removedField = tableToChange.fields.filter(
      (field) => field.field_name !== field_name
    );
    tableToChange.fields = removedField;
    const finalTable = [...remainingTables, tableToChange].sort(
      (a, b) => a.order - b.order
    );
    setTables(finalTable);
    if (props.dbid !== -1) {
      await axios.post("/api/deletefield", {
        field_name,
      })
    }
    else {
      props.settables(finalTable);
      props.setfields(props.fields.filter(field => field.field_name !== field_name))
      props.setarrows(props.arrows.filter(arrow => arrow.arrow_from !== field_name && arrow.arrow_to !== field_name))
    }
    rerender({ type: "FORCE_RERENDER" });
    props.refresh();
  };
  const tableNameField = useRef();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainHeader
        headerClass={classes.appBar}
        username={username}
        groupname={groupname}
        dbname={dbname}
      />
      <div>
        <Toolbar />
        <IconButton onClick={handleDrawerOpen} style={{ zIndex: 69 }}>
          <Menu color="primary" />
        </IconButton>
      </div>
      <Drawer
        anchor="left"
        open={open}
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <form onSubmit={tableAdderHandler} className={classes.formField}>
              <TextField
                inputRef={tableNameField}
                className={classes.textField}
                placeholder="Table Name"
                required
              />
              <Button type="submit" variant="outlined">
                New Table
              </Button>
            </form>

            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <List>
            {tables.map(({ name, fields, color, db_id, id }) => (
              <div key={name}>
                <SidebarExpandable
                  color={color}
                  fields={fields}
                  fieldAdder={fieldAdderHandler}
                  fieldDeleter={deleteFieldHandler}
                  tableDeleter={tableDeleteHandler}
                  db_id={db_id}
                  table_id={id}
                >
                  {name}
                </SidebarExpandable>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <main style={{ position: "absolute", zIndex: 0 }}>
        <Toolbar style={{ overflow: "hidden" }} />
        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
