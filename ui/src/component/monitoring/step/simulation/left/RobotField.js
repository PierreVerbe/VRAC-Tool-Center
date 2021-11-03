export const TABLE_WIDTH = 3000 //mm
export const TABLE_HEIGHT = 2000 //mm
export const REDUCING_FACTOR = 4

export class RobotField {
    constructor(context, image) {
        this.context = context
        this.image = image
    }

    render(monitoring, activeStepMonitoring) {
        // Draw base field
        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, TABLE_WIDTH / REDUCING_FACTOR, TABLE_HEIGHT / REDUCING_FACTOR)

        if (Object.keys(monitoring).length !== 0) {
            const step = monitoring.monitoring[activeStepMonitoring]
            this.renderRobot(step)
        }
    }

    renderRobot(step) {
        this.context.strokeRect(step.x / REDUCING_FACTOR, step.y / REDUCING_FACTOR, 100, 100)
    }
}
