import React from "react"

import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import { ELEVATION_PAGE_CONTENT } from "../../../Style"
import "./../../../Style.css"

const StatisticStrategy = () => {
    return (
        <div className="rootStep">
            <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPanel">
                <Typography variant="body1">StatisticStrategy section</Typography>
            </Paper>
        </div>
    )
}

export default StatisticStrategy
