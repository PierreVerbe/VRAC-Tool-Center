import React from "react"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 500,
    },
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}))

const TableStrategySearchBar = () => {
    const classes = useStyles()

    return (
        <div>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>

            <InputBase
                className={classes.input}
                placeholder="Search VRAC Strategy"
                inputProps={{ "aria-label": "search vrac strategy" }}
            />

            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default TableStrategySearchBar
