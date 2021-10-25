import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import clsx from "clsx"

import StepConnector from "@material-ui/core/StepConnector"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Paper from '@material-ui/core/Paper'
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GetAppIcon from '@material-ui/icons/GetApp';

import LoadDelete from "./step/load/LoadDelete"
import Simulation from "./step/Simulation"
import Statistic from "./step/Statistic"
import { setMonitoringStepperActionCreator } from "./../../action/monitoringAction"

import "./Monitoring.css"

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
      height: '80vh',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <LoadDelete/>
    case 1:
      return <Simulation/>
    case 2:
      return <Statistic/>
    default:
      return "Unknown step"
  }
}

const Monitoring = ({monitoringStepper, setMonitoringStepper}) => {

  const classes = useStyles()
  const steps = ["Load/Delete", "Simulation", "Statistic"]

  const handleNext = () => {
    monitoringStepper === steps.length - 1 ? setMonitoringStepper(0) : setMonitoringStepper(monitoringStepper + 1)
  }

  const handleBack = () => {
    monitoringStepper === 0 ? setMonitoringStepper(steps.length - 1) : setMonitoringStepper(monitoringStepper - 1)
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Stepper
          alternativeLabel
          activeStep={monitoringStepper}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography className={classes.instructions}>
          {getStepContent(monitoringStepper)}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Button>

      </Paper>
    </div>
  )
  
}

const mapStateToProps = state => ({
  monitoringStepper: state.monitoringStepper
})

const mapDispatchToProps = dispatch => ({
  setMonitoringStepper: monitoringStepper => dispatch(setMonitoringStepperActionCreator(monitoringStepper))
})

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
