import React from "react"

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import TableStrategy from "./left/TableStrategy"
import SelectedStrategy from "./right/SelectedStrategy"

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

const LoadDeleteStrategy = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        <TableStrategy />
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        <SelectedStrategy />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoadDeleteStrategy
