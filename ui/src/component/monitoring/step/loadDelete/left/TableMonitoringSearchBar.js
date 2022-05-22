import React from "react"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"

import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

import { useStyles } from "../../../../Style"

const TableMonitoringSearchBar = () => {
    const classes = useStyles()

    return (
        <div>
            <IconButton className={classes.loadTableSearchBarButton} aria-label="menu">
                <MenuIcon />
            </IconButton>

            <InputBase
                className={classes.loadTableSearchBar}
                placeholder="Search VRAC Monitoring"
                inputProps={{ "aria-label": "search vrac monitoring" }}
            />

            <IconButton type="submit" className={classes.loadTableSearchBarButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default TableMonitoringSearchBar
