import React from "react"
import { connect } from "react-redux"

import Typography from "@material-ui/core/Typography"
import ReplayIcon from "@material-ui/icons/Replay"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import {
    DEFAULT_ROBOT_X,
    DEFAULT_ROBOT_Y,
    DEFAULT_ROBOT_T,
    TABLE_WIDTH,
    TABLE_HEIGHT,
    REDUCING_FACTOR,
    RobotActionFactory,
} from "./RobotActionFactory"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22v2.jpg"
import RobotOpenImage from "./../../../resources/image/Robot/robot_open.png"

import { searchInputStrategy, searchNextStrategy } from "./RobotSearchGraph"
import {
    setSnackBarActionCreator,
    setPointerSimulatorActionCreator,
    setSimulatedRobotActionCreator,
} from "../../../action/generalAction"

import { Stage, Sprite, Graphics } from "@inlet/react-pixi"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"

import { useStyles } from "../../Style"

const RobotSimulator = ({
    strategyToSimulate,
    metaActionArrayToSimulate,
    simulatedRobot,
    pointerSimulator,
    setSimulatedRobot,
    setSnackBar,
    setPointerSimulator,
}) => {
    const classes = useStyles()

    const handleCursorPosition = (event) => {
        const x = Math.round((event.clientY - event.target.offsetTop) * REDUCING_FACTOR)
        const y = Math.round((event.clientX - event.target.offsetLeft) * REDUCING_FACTOR)
        setPointerSimulator({ x: x, y: y })

        event.preventDefault()
    }

    const handleActionIdButtonSimulator = (event, nextStrategyNodeId, nextMetaActionNodeId) => {
        let nextAction = {
            strategyNode: { id: undefined, name: undefined },
            metaActionNode: { id: undefined, name: undefined },
        }
        let actionData = undefined
        let previous = simulatedRobot.previous
        let result = undefined

        // Start simulator
        try {
            if (simulatedRobot.x === DEFAULT_ROBOT_X && simulatedRobot.y === DEFAULT_ROBOT_Y) {
                let inputNode = undefined

                // Search first strategy node & first meta action
                if (
                    simulatedRobot.actual.strategyNode.id === undefined &&
                    simulatedRobot.actual.metaActionNode.id === undefined
                ) {
                    inputNode = searchInputStrategy(strategyToSimulate, metaActionArrayToSimulate)
                    nextAction = inputNode.nextAction
                } else {
                    inputNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot)
                    nextAction = inputNode.nextAction
                }
                // Search "SetOdometry" action to place robot
                if (inputNode.actionData.type === "SetOdometry") actionData = inputNode.actionData

                result = RobotActionFactory(simulatedRobot, actionData)
                previous.push({
                    action: simulatedRobot.actual,
                    x: simulatedRobot.x,
                    y: simulatedRobot.y,
                    angle: simulatedRobot.angle,
                    render: simulatedRobot.render,
                })
            }

            // Search next node
            else {
                const nextNode = searchNextStrategy(
                    strategyToSimulate,
                    metaActionArrayToSimulate,
                    simulatedRobot,
                    nextStrategyNodeId,
                    nextMetaActionNodeId
                )
                nextAction = nextNode.nextAction
                actionData = nextNode.actionData
                result = RobotActionFactory(simulatedRobot, actionData)

                previous.push({
                    action: simulatedRobot.actual,
                    x: simulatedRobot.x,
                    y: simulatedRobot.y,
                    angle: simulatedRobot.angle,
                    render: simulatedRobot.render,
                })
            }

            setSimulatedRobot({
                ...simulatedRobot,
                x: result.x,
                y: result.y,
                angle: result.t,
                actual: nextAction,
                previous: previous,
                render: result.render,
            })
        } catch (error) {
            const snackBar = { isOpen: true, severity: "error", message: error.message }
            setSnackBar(snackBar)
        }

        event.preventDefault()
    }

    const handlePreviousAction = (event) => {
        let arrayPrevious = simulatedRobot.previous
        const previousAction = arrayPrevious.pop()

        setSimulatedRobot({
            ...simulatedRobot,
            x: previousAction.x,
            y: previousAction.y,
            angle: previousAction.angle,
            actual: previousAction.action,
            previous: arrayPrevious,
            render: previousAction.render,
        })

        event.preventDefault()
    }

    const handleResetSimulator = (event) => {
        const clearRender = (g) => {
            g.clear()
            g.endFill()
        }

        setSimulatedRobot({
            angle: DEFAULT_ROBOT_T,
            x: DEFAULT_ROBOT_X,
            y: DEFAULT_ROBOT_X,
            actual: {
                strategyNode: { id: undefined, name: undefined },
                metaActionNode: { id: undefined, name: undefined },
            },
            previous: [],
            render: clearRender,
        })

        event.preventDefault()
    }

    const controlSimulator = () => {
        /*
            previous
            next
            reset
        */

        if (
            simulatedRobot.actual.strategyNode.name === undefined &&
            simulatedRobot.actual.metaActionNode.name === undefined
        ) {
            return (
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.commonButton}
                        onClick={(event) => handleResetSimulator(event)}
                        startIcon={<ReplayIcon />}
                    >
                        Reset
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.commonButton}
                        onClick={(event) => handleActionIdButtonSimulator(event, undefined, undefined)}
                        disabled={strategyToSimulate.flow.length === 0}
                        startIcon={<PlayArrowIcon />}
                    >
                        Play
                    </Button>
                </div>
            )
        } else {
            const strategyNextNodes = strategyToSimulate.flow
                .filter((edgeStrategyAction) => edgeStrategyAction.source === simulatedRobot.actual.strategyNode.id)
                .map((node) => node.target)
            const strategyNextNodesButtons = strategyToSimulate.flow
                .filter(
                    (strategyNode) => strategyNextNodes.includes(strategyNode.id) && strategyNode.data.id !== undefined
                )
                .map((strategyNode) => {
                    return (
                        <Button
                            color="secondary"
                            variant="contained"
                            className={classes.commonButton}
                            onClick={(event) => handleActionIdButtonSimulator(event, strategyNode.id, undefined)}
                        >
                            {strategyNode.data.label}
                        </Button>
                    )
                })

            const actualMetaActionNode = metaActionArrayToSimulate.filter(
                (itemMetaAction) => itemMetaAction.name === simulatedRobot.actual.strategyNode.name
            )[0]
            const arrayNextMetaActionId = actualMetaActionNode.flow
                .filter((edgeMetaAction) => edgeMetaAction.source === simulatedRobot.actual.metaActionNode.id)
                .map((node) => node.target)
            const arrayNextMetaAction = actualMetaActionNode.flow
                .filter((node) => arrayNextMetaActionId.includes(node.id))
                .map((node) => {
                    return (
                        <Button
                            color="secondary"
                            variant="contained"
                            className={classes.commonButton}
                            onClick={(event) => handleActionIdButtonSimulator(event, undefined, node.id)}
                        >
                            {node.data.label}
                        </Button>
                    )
                })

            const prev = (
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.commonButton}
                    onClick={(event) => handlePreviousAction(event)}
                    startIcon={<SkipPreviousIcon />}
                >
                    Previous
                </Button>
            )

            return (
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.commonButton}
                        onClick={(event) => handleResetSimulator(event)}
                        startIcon={<ReplayIcon />}
                    >
                        Reset
                    </Button>

                    {prev}

                    {arrayNextMetaAction.length === 0 ? strategyNextNodesButtons : arrayNextMetaAction}
                </div>
            )
        }
    }

    return (
        <div>
            <Typography variant="body1">
                Simulator: Strategy node={simulatedRobot.actual.strategyNode.name} | Meta action node=
                {simulatedRobot.actual.metaActionNode.name}
            </Typography>

            <Stage
                onPointerMove={handleCursorPosition}
                width={TABLE_WIDTH / REDUCING_FACTOR}
                height={TABLE_HEIGHT / REDUCING_FACTOR}
            >
                <Sprite image={FieldImage} scale={{ x: 1 / REDUCING_FACTOR, y: 1 / REDUCING_FACTOR }} x={0} y={0} />
                <Sprite
                    image={RobotOpenImage}
                    scale={{ x: 1 / REDUCING_FACTOR, y: 1 / REDUCING_FACTOR }}
                    anchor={0.5}
                    angle={simulatedRobot.angle}
                    x={simulatedRobot.y}
                    y={simulatedRobot.x}
                />

                <Graphics draw={simulatedRobot.render} />
            </Stage>

            <Typography variant="body1">
                Position on Canvas: x={pointerSimulator.x} y={pointerSimulator.y}
            </Typography>

            {controlSimulator()}
        </div>
    )
}

RobotSimulator.propTypes = {
    strategyToSimulate: PropTypes.object,
    metaActionArrayToSimulate: PropTypes.array
}

const mapStateToProps = (state) => ({
    pointerSimulator: state.pointerSimulator,
    simulatedRobot: state.simulatedRobot
})

const mapDispatchToProps = (dispatch) => ({
    setSnackBar: (snackBar) => dispatch(setSnackBarActionCreator(snackBar)),
    setPointerSimulator: (snackBar) => dispatch(setPointerSimulatorActionCreator(snackBar)),
    setSimulatedRobot: (simulatedRobot) => dispatch(setSimulatedRobotActionCreator(simulatedRobot))
})

export default connect(mapStateToProps, mapDispatchToProps)(RobotSimulator)
