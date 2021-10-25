import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import TableMonitoring from "./TableMonitoring";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    iconButton: {
        padding: 10,
      },
    input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    },
    lol: {
        
    }
  }));

const LoadDelete = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper component="form">
                        <IconButton className={classes.iconButton} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            className={classes.input}
                            placeholder="Search VRAC Monitoring"
                            inputProps={{ 'aria-label': 'search vrac monitoring' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <TableMonitoring/>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default LoadDelete
