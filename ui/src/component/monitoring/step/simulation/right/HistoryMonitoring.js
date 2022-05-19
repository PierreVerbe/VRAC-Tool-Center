import React from "react"
import { connect } from "react-redux"

import Box from "@material-ui/core/Box"
import MobileStepper from "@material-ui/core/MobileStepper"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"

import { setActiveStepMonitoringActionCreator } from "../../../../../action/monitoringAction"

const useStyles = makeStyles({
  root: {
    width: "80%",
    flexGrow: 1,
  },
  list: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: "calc(100vh - 390px)",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
})

const HistoryMonitoring = ({ monitoring, activeStepMonitoring, setActiveStepMonitoring }) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleNext = (event) => {
    setActiveStepMonitoring(activeStepMonitoring + 1)

    event.preventDefault()
  }

  const handleBack = (event) => {
    setActiveStepMonitoring(activeStepMonitoring - 1)

    event.preventDefault()
  }

  const activeItemMonitoring = (isActive, stepMonitoring) => {
    return (
      <ListItem key={`item`} selected={isActive}>
        <ListItemText primary={JSON.stringify(stepMonitoring)} />
      </ListItem>
    )
  }

  const notifyEmptyMonitoring = () => {
    if (Object.keys(monitoring).length === 0) {
      return <Typography>Please load a monitoring</Typography>
    }
    else if (monitoring.monitoring === null) {
      return <Typography>Monitoring is empty</Typography>
    }
    else {
      return (
        <div>
          <Box display="flex" justifyContent="center">
            <MobileStepper
              variant="progress"
              steps={monitoring.monitoring.length}
              position="static"
              activeStep={activeStepMonitoring}
              className={classes.root}
              nextButton={
                <Button size="small" onClick={(event) => handleNext(event)} disabled={activeStepMonitoring === monitoring.monitoring.length - 1}>
                  Next
                  {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={(event) => handleBack(event)} disabled={activeStepMonitoring === 0}>
                  {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Box>

          <List className={classes.list} subheader={<li />}>
            {<li key={`section`} className={classes.listSection}>
              <ul className={classes.ul}>
                {monitoring.monitoring.map((item) =>
                  item.id === activeStepMonitoring ? activeItemMonitoring(true, item) : activeItemMonitoring(false, item)
                )}
              </ul>
            </li>}
          </List>
        </div>
      )
    }
  }

  return (
    <div>
      {notifyEmptyMonitoring()}
    </div>
  )
}

const mapStateToProps = state => ({
  monitoring: state.monitoring,
  activeStepMonitoring: state.activeStepMonitoring
})

const mapDispatchToProps = dispatch => ({
  setActiveStepMonitoring: activeStepMonitoring => dispatch(setActiveStepMonitoringActionCreator(activeStepMonitoring))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryMonitoring)
