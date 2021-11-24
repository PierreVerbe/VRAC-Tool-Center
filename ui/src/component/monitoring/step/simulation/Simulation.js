import React from "react"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { ELEVATION_PAGE_CONTENT, GRID_CONTAINER_SPACING } from "../../../Style"
import HistoryMonitoring from "./right/HistoryMonitoring"
import RobotFieldMonitoring from "./left/RobotFieldMonitoring"

import './../../../Style.css'

const Simulation = () => {
    return (
        <div className="rootStep">
            <Grid container spacing={GRID_CONTAINER_SPACING}>
                <Grid item xs={8}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                        <RobotFieldMonitoring />
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                        <HistoryMonitoring />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Simulation

/*
terrain gauche
droite log avec curseur (evolue log avec un play button)


evolution pas à pas
evolution vitesse du match



Version enlever
tri id, date, name

docker rasp + freebox ouvert port
*/