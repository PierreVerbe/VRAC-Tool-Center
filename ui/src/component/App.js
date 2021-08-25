import React from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

import Home from "./home/Home"
import UIStudent from "./student/UIStudent"

import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const App = () => {
  const routes = ["/", "/strategy", "/monitoring"]

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <AppBar>
              <Tabs
                value={
                  history.location.pathname !== ""
                    ? history.location.pathname
                    : false
                }
              >
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

        <Switch>
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
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
