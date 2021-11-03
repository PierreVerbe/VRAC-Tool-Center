import React from "react"

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import HistoryMonitoring from "./right/HistoryMonitoring"
import RobotFieldMonitoring from "./left/RobotFieldMonitoring"

const Simulation = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper>
                        <RobotFieldMonitoring/>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
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