import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import TableBackground from "./../../../../../resources/image/SailTheWorld/fondTable21.svg"

const TABLE_WIDTH = 3000 //mm
const TABLE_HEIGHT = 2000 //mm
const REDUCING_FACTOR = 4

const RobotField = ({ monitoring, activeStepMonitoring }) => {
    var img = new Image()
    img.src = TableBackground

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        img.onload = function () {
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, TABLE_WIDTH / REDUCING_FACTOR, TABLE_HEIGHT / REDUCING_FACTOR)
            const step = monitoring.monitoring[activeStepMonitoring]
            context.strokeRect(step.x / REDUCING_FACTOR, step.y / REDUCING_FACTOR, 100, 100)
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

export default connect(mapStateToProps)(RobotField)
