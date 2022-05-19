import React from "react"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles((theme) => ({
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}))

const TableMonitoringSearchBar = () => {
    const classes = useStyles()

    return (
        <div>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>

            <InputBase
                className={classes.input}
                placeholder="Search VRAC Monitoring"
                inputProps={{ "aria-label": "search vrac monitoring" }}
            />

            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default TableMonitoringSearchBar
