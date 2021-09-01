import React from "react"
import { connect } from "react-redux"
import { BrowserRouter, Link, Route, Switch as SwitchRouter } from "react-router-dom"

import Home from "./home/Home"
import UIStudent from "./student/UIStudent"

import { setDarkModeActionCreator } from "./../action/generalAction"

import './App.css'
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { Switch, AppBar, Tabs, Tab, Paper } from '@material-ui/core'

const App = ({darkMode, setDarkMode}) => {
  
  const darkTheme = createTheme({
    palette: {
      type: "dark"
    }
  })

  const ligthTheme = createTheme({})

  const routes = ["/", "/strategy", "/monitoring"]

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <Paper className="App">
      <Switch className="switchDarkMode" checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch>
        <BrowserRouter>
          <Route
            path="/"
            render={(history) => (
              <AppBar>
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
            </Route>
            <Route path="/" >
              <Home/>
            </Route>
          </SwitchRouter>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

const mapDispatchToProps = dispatch => ({
  setDarkMode: (darkMode) => dispatch(setDarkModeActionCreator(darkMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
