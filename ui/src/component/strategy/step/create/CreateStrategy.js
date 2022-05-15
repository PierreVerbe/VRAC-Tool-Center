import React from "react"

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import StrategyPanel from "./right/StrategyPanel"
import StrategySimulator from "./left/StrategySimulator"

import { ELEVATION_PAGE_CONTENT, GRID_CONTAINER_SPACING, MONITORING_GRID_SIZING } from "../../../Style"
import './../../../Style.css'

const CreateStrategy = () => {
    return (
        <div className="rootStep">
            <Grid container spacing={GRID_CONTAINER_SPACING}>
                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <StrategySimulator />
                    </Paper>
                </Grid>

                <Grid item xs={MONITORING_GRID_SIZING}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel" component="form">
                        <StrategyPanel />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateStrategy
