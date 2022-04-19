import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography';

import { DEFAULT_ROBOT_X, DEFAULT_ROBOT_Y, DEFAULT_ROBOT_T, TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, ROBOT_HEIGHT, RobotActionFactory } from "./RobotActionFactory"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22.jpg"
import RobotOpenImage from "./../../../resources/image/Robot/robot_open.png"

import {searchInputStrategy, searchNextStrategy} from "./RobotSearchGraph"

import { Stage, Sprite, Graphics } from '@inlet/react-pixi'
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"



const RobotSimulator = ({ strategyToSimulate, metaActionArrayToSimulate, activeStepMonitoring }) => {
    const [pointerSimulator, setPointerSimulator] = React.useState({x:undefined, y:undefined});
    //const [simulatedRobot, setSimulatedRobot] = React.useState({angle: 0, x: 700/REDUCING_FACTOR, y:700/REDUCING_FACTOR, actual: {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}, previous: []}); // {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}
    const [simulatedRobot, setSimulatedRobot] = React.useState({angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y:DEFAULT_ROBOT_Y, actual: {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}, previous: [], render: undefined}); // {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}

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

      const testt = simulatedRobot.render === undefined ? g => {
        g.clear()
        g.lineStyle(3, 0xFFFFFF, 1)
        //g.lineStyle(3, 0x000000, 1)
       
        g.moveTo(700/4, 700/4)
        g.bezierCurveTo(600/4, 400/4, 600/4, 400/4, 1800/4, 450/4) // pts de controles les mêmes == quadratique
        
       

        g.endFill()
      } : simulatedRobot.render


      
    
    const handleNextAction = () => {
        let nextAction = {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}
        let actionData = undefined

        // Start simulator 
        if(simulatedRobot.x === DEFAULT_ROBOT_X  && simulatedRobot.y === DEFAULT_ROBOT_Y){ // strategyToSimulate.flow.length != 0
           let inputNode = undefined

            // Search first strategy node & first meta action
           if(simulatedRobot.actual.strategyNode.id === undefined  && simulatedRobot.actual.metaActionNode.id === undefined){
            inputNode = searchInputStrategy(strategyToSimulate, metaActionArrayToSimulate)
            
            nextAction = inputNode.nextAction
            console.log("hello1")
           }
           else {
            console.log("hello2")
               inputNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot)
               nextAction = inputNode.nextAction
           }
           // Search "SetOdometry" action to place robot
            if (inputNode.actionData.type === "SetOdometry") actionData = inputNode.actionData        
        }

        // Search next node 
        else {
            const nextNode = searchNextStrategy(strategyToSimulate, metaActionArrayToSimulate, simulatedRobot)
            nextAction = nextNode.nextAction
            actionData = nextNode.actionData
        }

        const result = RobotActionFactory(simulatedRobot, actionData)
        console.log("result")
        console.log(result)
    
        setSimulatedRobot({...simulatedRobot, angle: result.t, x: result.x, y:result.y, actual: nextAction, previous: [], render: result.render})
    }

    const handleResetSimulator = () => {
        setSimulatedRobot({angle: DEFAULT_ROBOT_T, x: DEFAULT_ROBOT_X, y: DEFAULT_ROBOT_X, actual: {strategyNode: {id: undefined, name: undefined}, metaActionNode: {id: undefined, name: undefined}}, previous: [], render: undefined})
    }
    const draw2 = testt

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
                    image={RobotOpenImage}
                    scale={{ x: 0.25, y: 0.25 }}
                    anchor={0.5}
                    angle={simulatedRobot.angle}
                    x={simulatedRobot.y}
                    y={simulatedRobot.x}
                    />
                {/* <Graphics draw={draw} /> */}
                <Graphics draw={draw2} />
    
            </Stage>
            <Typography variant="body1">Simulator: Strategy node={simulatedRobot.actual.strategyNode.name} | Meta action node={simulatedRobot.actual.metaActionNode.name}</Typography>
    
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