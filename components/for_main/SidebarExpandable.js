import React, {useState, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
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
    TextField
} from '@material-ui/core';

import {
    KeyboardArrowUp,
    KeyboardArrowDown
} from '@material-ui/icons'

const SidebarExpandable = (props) =>{
    const useStyles = makeStyles((theme)=>({
        root: {
            minWidth: 0 
        },
        textField: {
            display: 'flex',
            padding: '0 10px 5px 10px',
            borderLeft: `7px solid hsl(${props.color}, 50%, 50%)`
        },
        textItem: {
            margin: '0 5px'
        }
    }));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [fieldField, dataField, keyField] = [useRef(), useRef(), useRef()];
    const handleAddField = (event) => {
        event.preventDefault();
        props.fieldAdder(props.children, {
            field: fieldField.current.value,
            type: dataField.current.value,
            key: keyField.current.value
        });
        fieldField.current.value = "";
        dataField.current.value = "";
        keyField.current.value = "";
    }
    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <>
            <ListItem 
                button 
                key={props.children}
                onClick={handleOpen}
                style={{borderLeft: `7px solid hsl(${props.color}, 50%, 50%)`}}
            >
                <ListItemText primary={props.children}/>
                <ListItemIcon className={classes.root}>{open ?<KeyboardArrowUp/> : <KeyboardArrowDown/>}</ListItemIcon>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TableContainer>
                    <Table aria-label={props.children} style={{borderLeft: `7px solid hsl(${props.color}, 50%, 50%)`}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell align="right">Data Type</TableCell>
                                <TableCell align="right">Key</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.fields.map((row)=>(
                                    <TableRow key={row.field}>
                                        <TableCell>{row.field}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                        <TableCell align="right">{row.key}</TableCell>
                                    </TableRow>
                                ))
                            }
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
                        <TextField
                            inputRef={keyField} 
                            className={classes.textItem}
                            placeholder="Key"
                            required
                        />
                    </div>
                    <div className={classes.textField}>
                        <Button type="submit" variant="outlined" fullWidth color='default'>Add to table</Button>
                    </div>
                </form>
            </Collapse>
        </>
        
    )
}

export default SidebarExpandable;