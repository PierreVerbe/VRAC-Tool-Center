import React from "react"

import Paper from '@material-ui/core/Paper'

import logo from "./../../resources/image/logo_VRAC.png"
import { ELEVATION_PAGE_CONTENT } from "../Style"

import "./../Style.css"
import "./Home.css"

const Home = () => {
    return (
        <div className="rootPage">
            <Paper className="paperPage" elevation={ELEVATION_PAGE_CONTENT}>
                <img id="logoVracHome" alt="Vrac Logo" src={logo} />
            </Paper>
        </div>
    )
}

export default Home
