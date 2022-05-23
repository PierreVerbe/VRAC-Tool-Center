import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import clsx from "clsx"

import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Typography from "@material-ui/core/Typography"

import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import GetAppIcon from "@material-ui/icons/GetApp"

import LoadDelete from "./step/loadDelete/LoadDelete"
import Simulation from "./step/simulation/Simulation"
import Statistic from "./step/statistic/Statistic"
import { getAllMonitoringsActionCreator, setMonitoringStepperActionCreator } from "./../../action/monitoringAction"

import { ELEVATION_PAGE_CONTENT, ColorlibConnector, useColorlibStepIconStyles, useStyles } from "./../Style"
import "./../Style.css"

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
}

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <GetAppIcon />,
    2: <DesktopWindowsIcon />,
    3: <EqualizerIcon />
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <LoadDelete />
    case 1:
      return <Simulation />
    case 2:
      return <Statistic />
    default:
      return "Unknown step"
  }
}

const Monitoring = ({ getAllMonitorings, monitoringStepper, setMonitoringStepper }) => {
  useEffect(getAllMonitorings)

  const classes = useStyles()
  const steps = [{ key: "Load/Delete", value: 0 }, { key: "Simulation", value: 1 }, { key: "Statistic", value: 2 }]

  const handleNextStep = (event, label) => {
    setMonitoringStepper(label.value)

    //event.preventDefault()
  }

  return (
    <div className="rootPage">
      <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPage">
        <Stepper
          alternativeLabel
          activeStep={monitoringStepper}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label.key} onClick={(event) => handleNextStep(event, label)}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label.key}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography component={"span"} className={classes.instructions}>
          {getStepContent(monitoringStepper)}
        </Typography>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => ({
  monitoringStepper: state.monitoringStepper
})

const mapDispatchToProps = dispatch => ({
  getAllMonitorings: () => dispatch(getAllMonitoringsActionCreator()),
  setMonitoringStepper: monitoringStepper => dispatch(setMonitoringStepperActionCreator(monitoringStepper))
})

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
