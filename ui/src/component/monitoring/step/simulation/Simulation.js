import React from "react"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import HistoryMonitoring from "./right/HistoryMonitoring"
import RobotField from "./left/RobotField"

const Simulation = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        <RobotField/>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <HistoryMonitoring/>
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