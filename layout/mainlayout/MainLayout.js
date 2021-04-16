import React, {useState, useRef} from 'react';
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

import SidebarExpandable from '../../components/for_main/SidebarExpandable';
import MainHeader from './MainHeader';

/* ------------------------------TEST DATA HERE---------------------------------------- */
import table from '../../misc/data';

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  /* ------------------------------TEST DATA HERE---------------------------------------- */
  const [tables, setTables] = useState(table);
  const tableAdderHandler = (event) => {
    event.preventDefault();
    const newTables = [...tables, {
      name: tableNameField.current.value,
      color: Math.random() * 100,
      fields: [],
      order: tables.length + 2
    }];
    setTables(newTables);
    tableNameField.current.value = "";
  }
  const fieldAdderHandler = (name, field) => {
    let tableToChange = tables.filter(table => table.name===name)[0];
    const tableArray = tables.filter(table=>table.name!==name);
    console.log(name, field, tableToChange, tableArray);
    tableToChange.fields.push(field); //field is an object with field, type, key
    const finalTable = [...tableArray, tableToChange].sort((a, b)=> (a.order - b.order));
    console.log(finalTable);
    setTables(finalTable);
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
            {tables.map(({name, fields, color}) => (
              <div key={name}>
              <SidebarExpandable 
                color={color} 
                fields={fields} 
                fieldAdder={fieldAdderHandler}
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