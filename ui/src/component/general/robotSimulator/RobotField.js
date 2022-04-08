export const TABLE_WIDTH = 3000 //mm
export const TABLE_HEIGHT = 2000 //mm

export const ROBOT_WIDTH = 320 //mm
export const ROBOT_HEIGHT = 220 //mm

export const REDUCING_FACTOR = 4

export class RobotField {
    constructor(context, image, robotImage) {
        this.context = context
        this.image = image
        this.robotImage = robotImage
    }

    render(monitoring, activeStepMonitoring, x, y) {
        console.log(x)
        // Draw base field
        //this.context.translate(0, 0)
        this.context.drawImage(this.image, 0, 0, TABLE_WIDTH / REDUCING_FACTOR, TABLE_HEIGHT / REDUCING_FACTOR)
        
        this.context.translate(1000/REDUCING_FACTOR, 1000/REDUCING_FACTOR)
        this.context.rotate(45 * Math.PI / 180)
        this.context.drawImage(this.robotImage, 0, 0, ROBOT_WIDTH/REDUCING_FACTOR, ROBOT_HEIGHT/REDUCING_FACTOR)
        
        this.context.translate(-1000/REDUCING_FACTOR, -1000/REDUCING_FACTOR)
        this.context.rotate(-45 * Math.PI / 180)

        if (Object.keys(monitoring).length !== 0) {
            const step = monitoring.monitoring[activeStepMonitoring]
            this.renderRobot(step)
        }
    }

    renderRobot(step) {
        this.context.strokeRect(step.x / REDUCING_FACTOR, step.y / REDUCING_FACTOR, 100, 100)
    }
}