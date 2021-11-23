import React from "react"

import Paper from '@material-ui/core/Paper'

import logo from "./../../resources/image/logo_VRAC.png"
import { ELEVATION_PAGE_CONTENT } from "../GeneralStyle"

import { makeStyles } from '@material-ui/core/styles'
import "./Home.css"

const useStyles = makeStyles({
    root: {
        padding: '20px'
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        height: 'calc(100vh - 88px)'
    },
})

const Home = () => {
    const classes = useStyles()

    return (
        <div id="rootHome"className={classes.root}>
            <Paper className={classes.paper} elevation={ELEVATION_PAGE_CONTENT}>
                <img id="logoVracHome" alt="Vrac Logo" src={logo} />
            </Paper>
        </div>
    )
}

export default Home
