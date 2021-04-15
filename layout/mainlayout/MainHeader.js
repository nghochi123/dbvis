import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Menu,
    MenuItem,
    Toolbar,
    IconButton,
    Breadcrumbs,
    Link    
} from '@material-ui/core';
import {
    AccountCircle,
    Home,
    Storage,
    TableChart,
    PeopleAlt,
    Settings
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    homeButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

const MainHeader = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar className={props.headerClass} color="primary" position="fixed">
            <Toolbar style={{justifyContent: 'space-between'}}>
                <IconButton color="inherit" aria-label="home" className={classes.homeButton}>
                    <Home />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb" color="inherit">
                    <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
                        <AccountCircle className={classes.icon} />
                        Username
                    </Link>
                    <Link
                        color="inherit"
                        href="/getting-started/installation/"
                        onClick={handleClick}
                        className={classes.link}
                    >
                    <PeopleAlt className={classes.icon} />
                        Group
                    </Link>
                    <Link
                        color="inherit"
                        href="/getting-started/installation/"
                        onClick={handleClick}
                        className={classes.link}
                    >
                        <Storage className={classes.icon} />
                        Database
                    </Link>
                    <Link
                        color="inherit"
                        href="/getting-started/installation/"
                        onClick={handleClick}
                        className={classes.link}
                    >
                        <TableChart className={classes.icon} />
                        Table
                    </Link>
                </Breadcrumbs>
                <div>
                    <IconButton
                        aria-label="settings"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Settings />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <hr/>
                        <MenuItem onClick={handleClose}>Advanced Settings</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default MainHeader;