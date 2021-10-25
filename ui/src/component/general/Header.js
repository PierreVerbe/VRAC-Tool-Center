import React from "react"
import { connect } from "react-redux"
import { BrowserRouter, Link, Route, Switch as SwitchRouter } from "react-router-dom"

import { Switch, AppBar, Tabs, Tab } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import Home from "./../home/Home"
import UIStudent from "./../student/UIStudent"
import Monitoring from "./../monitoring/Monitoring"
import { setDarkModeActionCreator } from "./../../action/generalAction"

import './Header.css'

const Header = ({darkMode, setDarkMode}) => {
    const routes = ["/", "/strategy", "/monitoring"]

    return (
        <header>
            <BrowserRouter>
                <Route
                    path="/"
                    render={(history) => (
                        <AppBar color="primary" position="static">
                            <Toolbar  variant="dense">
                                <MenuIcon />

                                <Tabs value={history.location.pathname !== "" ? history.location.pathname : false}>
                                    <Tab
                                        value={routes[0]}
                                        label="Home"
                                        component={Link}
                                        to={routes[0]}
                                    />
                                    <Tab
                                        value={routes[1]}
                                        label="Strategy"
                                        component={Link}
                                        to={routes[1]}
                                    />
                                    <Tab
                                        value={routes[2]}
                                        label="Monitoring"
                                        component={Link}
                                        to={routes[2]}
                                    />  
                                </Tabs>

                                <Brightness4Icon />
                                <Switch className="switchDarkMode" color="secondary" checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch>
                            </Toolbar>
                        </AppBar>
                    )}
                />

                <SwitchRouter>
                    <Route path="/strategy">
                        <h1 style={{ marginTop: "10vh" }}>Strategy part</h1>
                        <UIStudent/>
                    </Route>

                    <Route path="/monitoring" >
                        <h1 style={{ marginTop: "10vh" }}>Monitoring part</h1>
                        <Monitoring/>
                    </Route>
                    
                    <Route path="/" >
                        <Home/>
                    </Route>
                </SwitchRouter>
            </BrowserRouter>
        </header>
    )
}

const mapStateToProps = state => ({
    darkMode: state.darkMode
})
  
const mapDispatchToProps = dispatch => ({
    setDarkMode: (darkMode) => dispatch(setDarkModeActionCreator(darkMode))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)
