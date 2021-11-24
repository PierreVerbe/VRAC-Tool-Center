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

/*
https://devexpress.github.io/devextreme-reactive/react/chart/demos/overview/multiple-axes/



number step monitoring
ratio fail/success
points/steps monitoring ou temps


*/