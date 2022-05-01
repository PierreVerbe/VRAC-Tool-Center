import React from "react"
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography'

import { DEFAULT_ROBOT_X, DEFAULT_ROBOT_Y, DEFAULT_ROBOT_T, TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, RobotActionFactory } from "./RobotActionFactory"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22.jpg"
import RobotOpenImage from "./../../../resources/image/Robot/robot_open.png"

import { searchInputStrategy, searchNextStrategy } from "./RobotSearchGraph"
import { setSnackBarCreator } from "../../../action/generalAction"

import { Stage, Sprite, Graphics } from '@inlet/react-pixi'
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"

const RobotSimulator = ({ strategyToSimulate, metaActionArrayToSimulate, setSnackBar }) => {
    const [pointerSimulator, setPointerSimulator] = React.useState({ x: undefined, y: undefined })
    const [simulatedRobot, setSimulatedRobot] = React.useState({ angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y: DEFAULT_ROBOT_Y, actual: { strategyNode: { id: undefined, name: undefined }, metaActionNode: { id: undefined, name: undefined } }, previous: [], render: undefined })

    const handleCursorPosition = (e) => {
        const x = Math.round((e.clientY - e.target.offsetTop) * REDUCING_FACTOR)
        const y = Math.round((e.clientX - e.target.offsetLeft) * REDUCING_FACTOR)
        setPointerSimulator({ x: x, y: y })
    }

    const handleActionIdButtonSimulator = (e, nextStrategyNodeId, nextMetaActionNodeId) => {
        let nextAction = { strategyNode: { id: undefined, name: undefined }, metaActionNode: { id: undefined, name: undefined } }
        let actionData = undefined
        let previous = simulatedRobot.previous
        let result = undefined

        // Start simulator 
        try {
            if (simulatedRobot.x === DEFAULT_ROBOT_X && simulatedRobot.y === DEFAULT_ROBOT_Y) {
                let inputNode = undefined

                // Search first strategy node & first meta action
                if (simulatedRobot.actual.strategyNode.id === undefined && simulatedRobot.actual.metaActionNode.id === undefined) {
                    inputNode = searchInputStrategy(strategyToSimulate, metaActionArrayToSimulate)
                    nextAction = inputNode.nextAction
                }
                else {
                    inputNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot)
                    nextAction = inputNode.nextAction
                }
                // Search "SetOdometry" action to place robot
                if (inputNode.actionData.type === "SetOdometry") actionData = inputNode.actionData

                result = RobotActionFactory(simulatedRobot, actionData)
                previous.push({ action: simulatedRobot.actual, x: simulatedRobot.x, y: simulatedRobot.y, angle: simulatedRobot.angle, render: simulatedRobot.render })
            }

            // Search next node 
            else {
                const nextNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot, nextStrategyNodeId, nextMetaActionNodeId)
                nextAction = nextNode.nextAction
                actionData = nextNode.actionData
                result = RobotActionFactory(simulatedRobot, actionData)

                previous.push({ action: simulatedRobot.actual, x: simulatedRobot.x, y: simulatedRobot.y, angle: simulatedRobot.angle, render: simulatedRobot.render })
            }

            setSimulatedRobot({ ...simulatedRobot, x: result.x, y: result.y, angle: result.t, actual: nextAction, previous: previous, render: result.render })
        } catch (e) {
            const snackBar = { isOpen: true, severity: "error", message: e.message }
            setSnackBar(snackBar)
            console.log(e)
        }

    }

    const handlePreviousAction = (e) => {
        let arrayPrevious = simulatedRobot.previous
        const previousAction = arrayPrevious.pop()

        setSimulatedRobot({ ...simulatedRobot, x: previousAction.x, y: previousAction.y, angle: previousAction.angle, actual: previousAction.action, previous: arrayPrevious, render: previousAction.render })
    }

    const handleResetSimulator = () => {
        const clearRender = (g) => {
            g.clear()
            g.endFill()
        }

        setSimulatedRobot({ angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y: DEFAULT_ROBOT_X, actual: { strategyNode: { id: undefined, name: undefined }, metaActionNode: { id: undefined, name: undefined } }, previous: [], render: clearRender })
    }

    const controlSimulator = () => {
        /*
            previous
            next
            reset
        */

        if (simulatedRobot.actual.strategyNode.name === undefined && simulatedRobot.actual.metaActionNode.name === undefined) {
            return (
                <div>
                    <Button variant="contained" onClick={handleResetSimulator}>
                        Reset
                    </Button>

                    <Button variant="contained" onClick={e => handleActionIdButtonSimulator(e, undefined, undefined)} disabled={strategyToSimulate.flow.length === 0}>
                        Start
                    </Button>
                </div>
            )
        }
        else {
            const strategyNextNodes = strategyToSimulate.flow.filter(edgeStrategyAction => edgeStrategyAction.source === simulatedRobot.actual.strategyNode.id).map(node => node.target)
            const strategyNextNodesButtons = strategyToSimulate.flow.filter(strategyNode => strategyNextNodes.includes(strategyNode.id) && strategyNode.data.id !== undefined).map(strategyNode => {
                return (
                    <Button variant="contained" onClick={e => handleActionIdButtonSimulator(e, strategyNode.id, undefined)}>
                        {strategyNode.data.label}
                    </Button>
                )
            })

            const actualMetaActionNode = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === simulatedRobot.actual.strategyNode.name)[0]
            const arrayNextMetaActionId = actualMetaActionNode.flow.filter(edgeMetaAction => edgeMetaAction.source === simulatedRobot.actual.metaActionNode.id).map(node => node.target)
            const arrayNextMetaAction = actualMetaActionNode.flow.filter(node => arrayNextMetaActionId.includes(node.id)).map(node => {
                return (
                    <Button variant="contained" onClick={e => handleActionIdButtonSimulator(e, undefined, node.id)}>
                        {node.data.label}
                    </Button>
                )
            })

            console.log("strategyNextNodes")
            console.log(strategyNextNodes)
            console.log("strategyNextNodesButtons")
            console.log(strategyNextNodesButtons)

            const prev =
                <Button variant="contained" onClick={e => handlePreviousAction(e)}>
                    Previous
                </Button>

            return (
                <div>
                    <Button variant="contained" onClick={e => handleResetSimulator(e)}>
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
            <Typography variant="body1">Position on Canvas: x={pointerSimulator.x} y={pointerSimulator.y}</Typography>

            <Stage onPointerMove={handleCursorPosition} width={TABLE_WIDTH / REDUCING_FACTOR} height={TABLE_HEIGHT / REDUCING_FACTOR}>
                <Sprite
                    image={FieldImage}
                    scale={{ x: 1 / REDUCING_FACTOR, y: 1 / REDUCING_FACTOR }}
                    x={0}
                    y={0} />
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
            <Typography variant="body1">Simulator: Strategy node={simulatedRobot.actual.strategyNode.name} | Meta action node={simulatedRobot.actual.metaActionNode.name}</Typography>

            {controlSimulator()}
        </div>
    )
}

RobotSimulator.propTypes = {
    strategyToSimulate: PropTypes.object,
    metaActionArrayToSimulate: PropTypes.array
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    setSnackBar: snackBar => dispatch(setSnackBarCreator(snackBar))
})

export default connect(mapStateToProps, mapDispatchToProps)(RobotSimulator)
