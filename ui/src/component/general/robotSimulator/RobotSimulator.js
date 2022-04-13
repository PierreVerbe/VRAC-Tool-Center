import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography';

import { TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, ROBOT_HEIGHT, RobotActionFactory } from "./RobotActionFactory"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22.jpg"
import RobotCloseImage from "./../../../resources/image/Robot/robot_close.png"

import { Stage, Sprite, Graphics } from '@inlet/react-pixi'
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"



const RobotSimulator = ({ strategyToSimulate, metaActionArrayToSimulate, activeStepMonitoring }) => {
    const [pointerSimulator, setPointerSimulator] = React.useState({x:undefined, y:undefined});
    const [simulatedRobot, setSimulatedRobot] = React.useState({angle: 90, x: ROBOT_HEIGHT/REDUCING_FACTOR/2, y:700/REDUCING_FACTOR, actual: {strategyNode: undefined, metaActionNode: undefined}, previous: []});

   console.log(strategyToSimulate)
   console.log(metaActionArrayToSimulate)

    const testFunction = (e) => {
        //console.log(e)
        const x = Math.round((e.clientY - e.nativeEvent.originalTarget.offsetTop) * REDUCING_FACTOR)
        const y = Math.round((e.clientX - e.nativeEvent.originalTarget.offsetLeft) * REDUCING_FACTOR)
        setPointerSimulator({x: x, y: y})
    }

    const draw = React.useCallback(g => {
        g.clear()
        g.beginFill(0xff3300)
        g.lineStyle(4, 0xffd900, 1)
        g.moveTo(50, 50)
        g.lineTo(250, 50)
        g.lineTo(100, 100)
        g.lineTo(50, 50)
        g.endFill()
        g.lineStyle(2, 0x0000ff, 1)
        g.beginFill(0xff700b, 1)
        g.drawRect(50, 150, 120, 120)
        g.lineStyle(2, 0xff00ff, 1)
        g.beginFill(0xff00bb, 0.25)
        g.drawRoundedRect(150, 100, 300, 100, 15)
        g.endFill()
        g.lineStyle(0)
        g.beginFill(0xffff0b, 0.5)
        g.drawCircle(470, 90, 60)
        g.endFill()
      }, [])

      const draw2 = React.useCallback(g => {
        g.clear()
        g.lineStyle(4, 0xffffff, 1)
        g.moveTo(500/4, 500/4)
        g.lineTo(700 /4, 700/4)
        g.endFill()
      }, [])
    
    const handleNextAction = () => {
        setSimulatedRobot({...simulatedRobot, angle: simulatedRobot.angle + 10, x: simulatedRobot.x + 100, y:simulatedRobot.y + 100})

        let actionData = undefined

        if(simulatedRobot.actual.strategyNode === undefined){ // strategyToSimulate.flow.length != 0
            const strategyInputNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.type === "input")[0]
            const inputNodeLabel = strategyInputNode.data.label

            const metaAction = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === inputNodeLabel)[0]
            const metaActionInputNode = metaAction.flow.filter(nodeMetaAction => nodeMetaAction.type === "input")[0]


            console.log("hiiiii")
            console.log(inputNodeLabel)
            console.log(metaAction)
            console.log(metaActionInputNode.actionData)
            actionData = metaActionInputNode.actionData
        }
        else {
            
            const actualStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === simulatedRobot.actual.strategyNode)[0]
            const actualMetaActionNode = metaActionArrayToSimulate.filter(itemMetaAction => itemMetaAction.name === simulatedRobot.actual.metaActionNode)[0]

            // Check if End node in metaAction
            if (actualStrategyNode.type === "output" && actualMetaActionNode.type === "output") {

            }
            else if (actualMetaActionNode.type === "output") {
                const actualStrategyEdge = strategyToSimulate.flow.filter(edgeStrategy => edgeStrategy.source === actualStrategyNode.id)[0] // select one
                
                const nextStrategyNode = strategyToSimulate.flow.filter(nodeStrategy => nodeStrategy.id === actualStrategyEdge.target)[0]
                const nextMetaActionNode = metaActionArrayToSimulate
                    .filter(itemMetaAction => itemMetaAction.name === nextStrategyNode.data.label)[0]
                    .flow
                    .filter(nodeMetaAction => nodeMetaAction.type === "input")[0]

                actionData = nextMetaActionNode.actionData
            }
            else {
                const nextMetaActionNode = metaActionArrayToSimulate
                    .filter(itemMetaAction => itemMetaAction.name === actualStrategyNode.data.label)[0]
                    .flow
                    .filter(edgeMetaAction => edgeMetaAction.source === actualStrategyNode.id)[0] // select one
                    
                    actionData = nextMetaActionNode.actionData
            }

        }

        const result = RobotActionFactory(simulatedRobot, actionData)



    }

    const handleResetSimulator = () => {
        setSimulatedRobot({angle: 90, x: ROBOT_HEIGHT/REDUCING_FACTOR/2, y:700/REDUCING_FACTOR, actual: {strategyNode: undefined, metaActionNode: undefined}, previous: []})
    }

    return (
        <div>
            <Typography variant="body1">Position on Canvas: x={pointerSimulator.x} y={pointerSimulator.y}</Typography>

            <Stage onPointerMove={testFunction} width={3000/4} height={2000/4}>
                <Sprite 
                    image={FieldImage} 
                    scale={{ x: 0.25, y: 0.25 }}
                    x={0}
                    y={0}/>
                <Sprite 
                    image={RobotCloseImage}
                    scale={{ x: 0.25, y: 0.25 }}
                    anchor={0.5}
                    angle={simulatedRobot.angle}
                    x={simulatedRobot.x}
                    y={simulatedRobot.y}
                    />
                <Graphics draw={draw} />
                <Graphics draw={draw2} />
    
            </Stage>
            <Typography variant="body1">Position on Canvas: x={pointerSimulator.x} y={pointerSimulator.y}</Typography>
    
            <Button variant="contained" onClick={handleResetSimulator}>
                Reset simulator
            </Button>

            <Button variant="contained" onClick={handleNextAction}>
                Next Action
            </Button>
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