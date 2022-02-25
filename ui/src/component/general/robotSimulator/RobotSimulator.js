import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"

import { TABLE_WIDTH, TABLE_HEIGHT, REDUCING_FACTOR, RobotField } from "./RobotField"
import FieldImage from "./../../../resources/image/SailTheWorld/fondTable21.svg"

const RobotSimulator = ({ monitoring, activeStepMonitoring }) => {
    const fieldImage = new Image()
    fieldImage.src = FieldImage

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        fieldImage.onload = function () {
            const robotField = new RobotField(context, fieldImage)
            robotField.render(monitoring, activeStepMonitoring)
        }
    })

    return (
        <div>
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