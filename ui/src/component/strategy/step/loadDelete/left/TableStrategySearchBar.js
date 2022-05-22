import React from "react"

import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"

import { useStyles } from "../../../../Style"

const TableStrategySearchBar = () => {
    const classes = useStyles()

    return (
        <div>
            <IconButton className={classes.loadTableSearchBarButton} aria-label="menu">
                <MenuIcon />
            </IconButton>

            <InputBase
                className={classes.loadTableSearchBar}
                placeholder="Search VRAC Strategy"
                inputProps={{ "aria-label": "search vrac strategy" }}
            />

            <IconButton type="submit" className={classes.loadTableSearchBarButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default TableStrategySearchBar
