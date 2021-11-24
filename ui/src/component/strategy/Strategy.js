import React from "react"

import Paper from '@material-ui/core/Paper'

import { ELEVATION_PAGE_CONTENT } from "./../Style"

import "./../Style.css"

const Strategy = () => {
    return (
        <div className="rootPage">
            <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPage">
            </Paper>
        </div>
    )
}

export default Strategy