import React /*, { useEffect } */ from "react"
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

import CreateIcon from '@material-ui/icons/Create';
import EqualizerIcon from '@material-ui/icons/Equalizer'
import GetAppIcon from '@material-ui/icons/GetApp'

import CreateStrategy from "./step/create/CreateStrategy"
import LoadDeleteStrategy from "./step/loadDelete/LoadDeleteStrategy"
import StatisticStrategy from "./step/statistic/StatisticStrategy"


import { setStrategyStepperActionCreator } from "./../../action/strategyAction"

import { ELEVATION_PAGE_CONTENT } from "./../Style"

import "./../Style.css"

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
        index: 1,
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
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
}

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles()
    const { active, completed } = props

    const icons = {
        1: <CreateIcon />,
        2: <GetAppIcon />,
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
            return <CreateStrategy />
        case 1:
            return <LoadDeleteStrategy />
        case 2:
            return <StatisticStrategy />
        default:
            return "Unknown step"
    }
}

const Strategy = ({ strategyStepper, setStrategyStepper }) => {
    //useEffect(getAllMonitorings) // get all strategies

    const classes = useStyles()
    const steps = ["Create", "Load/Delete", "Statistic"]

    const handleNext = () => {
        strategyStepper === steps.length - 1 ? setStrategyStepper(0) : setStrategyStepper(strategyStepper + 1)
    }

    const handleBack = () => {
        strategyStepper === 0 ? setStrategyStepper(steps.length - 1) : setStrategyStepper(strategyStepper - 1)
    }

    return (
        <div className="rootPage">
            <Paper elevation={ELEVATION_PAGE_CONTENT} className="paperPage">
                <Stepper
                    alternativeLabel
                    activeStep={strategyStepper}
                    connector={<ColorlibConnector />}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Typography className={classes.instructions}>
                    {getStepContent(strategyStepper)}
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
        </div >
    )
}

const mapStateToProps = state => ({
    strategyStepper: state.strategyStepper
})

const mapDispatchToProps = dispatch => ({
    setStrategyStepper: strategyStepper => dispatch(setStrategyStepperActionCreator(strategyStepper))
})

export default connect(mapStateToProps, mapDispatchToProps)(Strategy)
