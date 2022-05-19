import React from "react"

import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

import TableStrategy from "./left/TableStrategy"
import SelectedStrategy from "./right/SelectedStrategy"

import { ELEVATION_PAGE_CONTENT, GRID_CONTAINER_SPACING, MONITORING_GRID_SIZING } from "../../../Style"
import "./../../../Style.css"

const LoadDeleteStrategy = () => {
    return (
        <div className="rootStep">
            <Grid container spacing={GRID_CONTAINER_SPACING}>
                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <TableStrategy />
                    </Paper>
                </Grid>

                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <SelectedStrategy />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoadDeleteStrategy
