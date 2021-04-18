import React, {useState, useRef, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  Button,
  IconButton,
  TextField
} from '@material-ui/core';
import {
  ChevronLeft,
  Menu
} from '@material-ui/icons'
import axios from 'axios';
import {RerenderDispatchContext} from '../../context/TableContainerForceRerender';


import SidebarExpandable from '../../components/for_main/SidebarExpandable';
import MainHeader from './MainHeader';

/* ------------------------------TEST DATA HERE---------------------------------------- */

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    overflow: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  textField: {
    display: 'flex',
    padding: '0 10px 0 10px'
  },
  formField: {
    display: 'flex',
  }
}));

const MainLayout = (props) => {
  const rerender = useContext(RerenderDispatchContext);
  const classes = useStyles();
  const table = props.tables.map(table=>{
    return {
      id: table.id,
      name: table.tbl_name,
      color: table.color,
      fields: props.fields.filter(field=>field.table_id === table.id),
      order: table.id,
      top: table._top,
      left: table._left,
      db_id: table.db_id
    }
  })
  const [open, setOpen] = useState(false);
  /* ------------------------------TEST DATA HERE---------------------------------------- */
  const [tables, setTables] = useState(table);
  const tableAdderHandler = async (event) => {
    event.preventDefault();
    const tbl = {
      name: tableNameField.current.value,
      color: Math.random() * 100,
      fields: [],
      order: tables.length + 2,
      top: 500,
      left: 500
    };
    const newTables = [...tables, tbl];
    setTables(newTables);
    tableNameField.current.value = "";
    await axios.post('/api/addtable', {
      tbl_name: tbl.name,
      color: tbl.color,
      _top: tbl.top,
      _left: tbl.left,
      db_id: 1
    })
    .then(res=>console.log(res))
    .catch(e=>console.log(e));
    props.refresh();
  }
  const fieldAdderHandler = async (name, field, db_id, table_id, fieldname) => {
    console.log(db_id, props.dbname, name);
    const concat_dbname = props.dbname.find(item=>item.db_id === db_id).concat_dbname;
    const newname = `${concat_dbname}-${name}-${fieldname}`;
    let tableToChange = tables.filter(table => table.name===name)[0];
    const tableArray = tables.filter(table=>table.name!==name);
    tableToChange.fields.push(field); //field is an object with field, type, key
    const finalTable = [...tableArray, tableToChange].sort((a, b)=> (a.order - b.order));
    setTables(finalTable);
    await axios.post('/api/addfield', {...field, field_name: newname, table_id})
    .then(res=>console.log(res))
    .catch(e=>console.log(e));
    //Force rerender in table container
    props.refresh();
  }
  /* ------------------------------END OF TEST DATA---------------------------------------- */
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
      <MainHeader headerClass={classes.appBar}/>
      <div>
        <Toolbar/>
        <IconButton onClick={handleDrawerOpen} style={{zIndex: 69}}>
          <Menu color="primary"/>
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
              <Button type="submit" variant="outlined">New Table</Button>
            </form>
            
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <List>
            {tables.map(({name, fields, color, db_id, id}) => (
              <div key={name}>
              <SidebarExpandable 
                color={color} 
                fields={fields} 
                fieldAdder={fieldAdderHandler}
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
      <main style={{position: 'absolute', zIndex: 0}}>
        <Toolbar style={{overflow: 'hidden'}}/>
        {props.children}
      </main>
    </div>
  );
}

export default MainLayout;