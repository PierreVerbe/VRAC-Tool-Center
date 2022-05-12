import React from "react"
import { connect } from "react-redux"

import Header from "./general/Header"

import "./Style.css"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

import { blue, green } from "@material-ui/core/colors"

import { setSnackBarActionCreator } from "./../action/generalAction"

const App = ({ darkMode, snackBar, setSnackBar }) => {
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

  const handleClose = (event) => {
    setSnackBar({ isOpen: false, severity: undefined, message: undefined })
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <Paper id="App" elevation={0} square={true}>
        <Header />
        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackBar.isOpen}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackBar.severity}>
            {snackBar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  snackBar: state.snackBar
})

const mapDispatchToProps = dispatch => ({
  setSnackBar: snackBar => dispatch(setSnackBarActionCreator(snackBar))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
