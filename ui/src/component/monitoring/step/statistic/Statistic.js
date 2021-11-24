import React from "react"

import Paper from '@material-ui/core/Paper'

import { ELEVATION_PAGE_CONTENT } from "../../../Style"


import './../../../Style.css'

const Statistic = () => {
    return (
        <div className="rootStep">
            <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                <p>Statistic section</p>
            </Paper>
        </div>
    )
}

export default Statistic
