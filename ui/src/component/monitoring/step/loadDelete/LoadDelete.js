import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import TableMonitoring from "./left/TableMonitoring"
import SelectedMonitoring from "./right/SelectedMonitoring"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }
}))

const LoadDelete = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        <TableMonitoring />
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        <SelectedMonitoring />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoadDelete
