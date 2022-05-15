import React from "react"

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import TableMonitoring from "./left/TableMonitoring"
import SelectedMonitoring from "./right/SelectedMonitoring"

import { ELEVATION_PAGE_CONTENT, GRID_CONTAINER_SPACING, MONITORING_GRID_SIZING } from "../../../Style"
import './../../../Style.css'

const LoadDelete = () => {
    return (
        <div className="rootStep">
            <Grid container spacing={GRID_CONTAINER_SPACING}>
                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <TableMonitoring />
                    </Paper>
                </Grid>

                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <SelectedMonitoring />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoadDelete
