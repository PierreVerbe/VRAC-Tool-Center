import React from "react"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import { ELEVATION_PAGE_CONTENT, GRID_CONTAINER_SPACING,MONITORING_GRID_SIZING } from "../../../Style"
import HistoryMonitoring from "./right/HistoryMonitoring"
import MonitoringSimulation from "./left/MonitoringSimulation"

import "./../../../Style.css"

const Simulation = () => {
    return (
        <div className="rootStep">
            <Grid container spacing={GRID_CONTAINER_SPACING}>
                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                        <MonitoringSimulation />
                    </Paper>
                </Grid>

                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                        <HistoryMonitoring />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Simulation
