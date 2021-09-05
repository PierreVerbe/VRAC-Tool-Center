import React from "react"
import { connect } from "react-redux"

import Header from "./general/Header"
import Footer from "./general/Footer"

import './App.css'
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import Paper from '@material-ui/core/Paper'
import { blue, green } from "@material-ui/core/colors"

const App = ({darkMode}) => {
  
  const darkTheme = createTheme({
    palette: {
      type: "dark"
    }
  })

  const ligthTheme = createTheme({
    palette: {
      primary: {
        main: blue[500]
      },
      secondary: {
        main: green[500]
      }
    }
  })

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <Paper className="App">
        <Header/>
        <Footer/>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  darkMode: state.darkMode
})

export default connect(mapStateToProps)(App)
