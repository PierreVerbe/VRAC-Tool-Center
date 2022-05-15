import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import clsx from "clsx"

import Paper from '@material-ui/core/Paper'
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
//import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import CreateIcon from '@material-ui/icons/Create';
import EqualizerIcon from '@material-ui/icons/Equalizer'
import GetAppIcon from '@material-ui/icons/GetApp'

import CreateStrategy from "./step/create/CreateStrategy"
import LoadDeleteStrategy from "./step/loadDelete/LoadDeleteStrategy"
import StatisticStrategy from "./step/statistic/StatisticStrategy"
import { setStrategyStepperActionCreator, getAllStrategiesActionCreator } from "./../../action/strategyAction"
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

const Strategy = ({ strategyStepper, getAllStrategies, setStrategyStepper }) => {
    useEffect(getAllStrategies) // get all strategies

    const classes = useStyles()
    const steps = [{ key: "Create", value: 0 }, { key: "Load/Delete", value: 1 }, { key: "Statistic", value: 2 }]

    /*
    const handleNext = () => {
        strategyStepper === steps.length - 1 ? setStrategyStepper(0) : setStrategyStepper(strategyStepper + 1)
    }

    const handleBack = () => {
        strategyStepper === 0 ? setStrategyStepper(steps.length - 1) : setStrategyStepper(strategyStepper - 1)
    }
    */

    const testNext = (label) => {
        setStrategyStepper(label.value)
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
                        <Step key={label.key} onClick={() => testNext(label)}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label.key}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Typography component={'span'} className={classes.instructions}>
                    {getStepContent(strategyStepper)}
                </Typography>

                {/*

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

                */}
            </Paper>
        </div >
    )
}

const mapStateToProps = state => ({
    strategyStepper: state.strategyStepper
})

const mapDispatchToProps = dispatch => ({
    getAllStrategies: () => dispatch(getAllStrategiesActionCreator()),
    setStrategyStepper: strategyStepper => dispatch(setStrategyStepperActionCreator(strategyStepper))
})

export default connect(mapStateToProps, mapDispatchToProps)(Strategy)
