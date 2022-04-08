import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import Typography from '@material-ui/core/Typography';

import { TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, RobotField } from "./RobotField"
import FieldImage from "./../../../resources/image/AgeOfBots/fondTable22.jpg"
import RobotCloseImage from "./../../../resources/image/Robot/robot_close.png"

const RobotSimulator = ({ monitoring, activeStepMonitoring }) => {
    const [canvasX, setCanvasX] = React.useState(null);
    const [canvasY, setCanvasY] = React.useState(null);

    const robotCloseImage = new Image()
    robotCloseImage.src = RobotCloseImage

    const fieldImage = new Image()
    fieldImage.src = FieldImage

    

    const canvasRef = useRef(null)

    

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const robotField = new RobotField(context, fieldImage, robotCloseImage)

        robotCloseImage.onload = function () {}

        fieldImage.onload = function () {
            
            robotField.render(monitoring, activeStepMonitoring, canvasX, canvasY)
        }

        canvasRef.current.addEventListener("mousemove", function(e) { 
            var cRect = canvasRef.current.getBoundingClientRect()
            //robotField.render(monitoring, activeStepMonitoring, canvasX, canvasY)
            setCanvasX(Math.round((e.clientY - cRect.top) * REDUCING_FACTOR))   
            setCanvasY(Math.round((e.clientX - cRect.left) * REDUCING_FACTOR))
        })
    }, [])

    

    return (
        <div>
            <Typography variant="body1">Position on Canvas: x={canvasX} y={canvasY}</Typography>
            <canvas ref={canvasRef} width={TABLE_WIDTH / REDUCING_FACTOR} height={TABLE_HEIGHT / REDUCING_FACTOR}>
                Désolé, votre navigateur ne prend pas en charge &ltcanvas&gt.
            </canvas>
        </div>
    )
}

const mapStateToProps = state => ({
    monitoring: state.monitoring,
    activeStepMonitoring: state.activeStepMonitoring
})

export default connect(mapStateToProps)(RobotSimulator)