import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography'

import { DEFAULT_ROBOT_X, DEFAULT_ROBOT_Y, DEFAULT_ROBOT_T, TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, ROBOT_HEIGHT, RobotActionFactory } from "./RobotActionFactory"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22.jpg"
import RobotOpenImage from "./../../../resources/image/Robot/robot_open.png"

import { searchInputStrategy, searchNextStrategy } from "./RobotSearchGraph"

import { Stage, Sprite, Graphics } from '@inlet/react-pixi'
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"

const RobotSimulator = ({ strategyToSimulate, metaActionArrayToSimulate, activeStepMonitoring }) => {
    const [pointerSimulator, setPointerSimulator] = React.useState({ x: undefined, y: undefined })
    const [simulatedRobot, setSimulatedRobot] = React.useState({ angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y: DEFAULT_ROBOT_Y, actual: { strategyNode: { id: undefined, name: undefined }, metaActionNode: { id: undefined, name: undefined } }, previous: [], render: undefined })

    const handleCursorPosition = (e) => {
        const x = Math.round((e.clientY - e.nativeEvent.originalTarget.offsetTop) * REDUCING_FACTOR)
        const y = Math.round((e.clientX - e.nativeEvent.originalTarget.offsetLeft) * REDUCING_FACTOR)
        setPointerSimulator({ x: x, y: y })
    }

    const handleActionIdButtonSimulator = (e, nextNodeId) => {
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

                    if (inputNode.actionData === undefined && inputNode.nextAction === undefined) throw "Input node in strategy graph need to be completed"

                    nextAction = inputNode.nextAction
                }
                else {
                    console.log("hello ")
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
                const nextNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot, nextNodeId)
                nextAction = nextNode.nextAction
                actionData = nextNode.actionData
                result = RobotActionFactory(simulatedRobot, actionData)

                previous.push({ action: simulatedRobot.actual, x: simulatedRobot.x, y: simulatedRobot.y, angle: simulatedRobot.angle, render: simulatedRobot.render })
            }

            setSimulatedRobot({ ...simulatedRobot, x: result.x, y: result.y, angle: result.t, actual: nextAction, previous: previous, render: result.render })
            console.log("shows simulatedRobot")
            console.log(simulatedRobot)
        } catch (e) {
            console.log(e)
        }

    }

    const handlePreviousAction = (e) => {
        console.log("simulatedRobot")
        console.log(simulatedRobot)

        let arrayPrevious = simulatedRobot.previous
        const previousAction = arrayPrevious.pop()


        console.log("previousAction")
        console.log(previousAction)
        console.log(arrayPrevious)

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

                    <Button variant="contained" onClick={e => handleActionIdButtonSimulator(e)} disabled={strategyToSimulate.flow.length === 0}>
                        Start
                    </Button>
                </div>
            )
        }
        else {
            const actualMetaActionNode = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === simulatedRobot.actual.strategyNode.name)[0]
            const arrayNextMetaActionId = actualMetaActionNode.flow.filter(edgeMetaAction => edgeMetaAction.source === simulatedRobot.actual.metaActionNode.id).map(node => node.target)
            const arrayNextMetaAction = actualMetaActionNode.flow.filter(node => arrayNextMetaActionId.includes(node.id)).map(node => {
                return (
                    <Button variant="contained" onClick={e => handleActionIdButtonSimulator(e, node.id)}>
                        {node.data.label}
                    </Button>
                )
            })

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

                    {arrayNextMetaAction}
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

const mapStateToProps = state => ({
    monitoring: state.monitoring,
    activeStepMonitoring: state.activeStepMonitoring
})

export default connect(mapStateToProps)(RobotSimulator)