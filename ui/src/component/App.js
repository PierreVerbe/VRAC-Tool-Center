import React from "react"
import { connect } from "react-redux"

import Header from "./general/Header"

import './App.css'
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import Paper from '@material-ui/core/Paper'

const App = ({darkMode}) => {
  
  const darkTheme = createTheme({
    palette: {
      type: "dark"
    }
  })

  const ligthTheme = createTheme({})

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <Paper className="App">
        <Header/>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

export default connect(mapStateToProps)(App)
