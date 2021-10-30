import React from "react"

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import logo from "./../../resources/image/logo_VRAC.png"

import "./Home.css"

const useStyles = makeStyles({
    root: {
        padding: '20px',
        height: '80vh',
    },
    paper: {
        width: '100%',
        height: '100%',
    },
})

const Home = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <img id="logoVracHome" alt="Vrac Logo" src={logo} />
                <div id="textHome">
                    <Typography variant="h1" component="h2">Vieux Roboticiens Amis de Cachan</Typography>
                    <Typography variant="h2">Participations :</Typography>
                    <Typography >Édition 2018 Coupe de France de robotique (CRAC) : 4 ème</Typography >
                    
                    <Typography >Édition 2019</Typography >
                    <ul>
                        <li><Typography>Coupe de France de robotique : 34 ème</Typography></li>
                        <li><Typography >Coupe de D'île de france : 9 ème</Typography></li>
                    </ul>
                    
                    <Typography >Édition 2020 Coupe de France de robotique : 9 ème</Typography >
                    
                    <Typography >Édition 2021</Typography >
                    <ul>
                        <li><Typography >Coupe de France de robotique : 9 ème</Typography></li>
                        <li><Typography >Coupe de D'île de france : 2 ème</Typography></li>
                    </ul>
                </div>
            </Paper>
        </div>
    )
}

export default Home
