import PropTypes from "prop-types"
export const DEFAULT_ROBOT_X = -1000
export const DEFAULT_ROBOT_Y = -1000
export const DEFAULT_ROBOT_T = 0

export const TABLE_WIDTH = 3000 //mm
export const TABLE_HEIGHT = 2000 //mm

export const ROBOT_WIDTH = 320 //mm
export const ROBOT_HEIGHT = 220 //mm

export const REDUCING_FACTOR = 4

const outsideLine = 0x0000FF
const insideLine = 0x000000

export const RobotActionFactory = (robot, action) => {
    const actionType = action !== undefined ? action.type : undefined

    switch (actionType) {
        case "Bezier":
            
            
            return {x:xBezier, y:yBezier, t:angleBezier, render: renderBezier}
        
        case "Homing":

            return

        case "Line":
            
            
            return {x:xLine, y:yLine, t:robot.angle, render: renderLine}

        case "Rotate":
            const thetaRotate = action.relative ? robot.t - action.theta : - action.theta
        
            return {x:robot.x, y:robot.y, t: thetaRotate}

        case "SetOdometry":
            console.log("SetOdometry")
            const xSetOdometry = action.x/ REDUCING_FACTOR
            const ySetOdometry = action.y/ REDUCING_FACTOR

            return {x:xSetOdometry, y:ySetOdometry, t:action.theta}

        case "XYT":
            const thetaXYT = - action.theta
            const xXYT = action.x/REDUCING_FACTOR
            const yXYT = action.y/REDUCING_FACTOR
            
            return {x:xXYT, y:yXYT, t:thetaXYT}

        default:
            return {x:robot.x, y:robot.y, t:robot.t}
    }

}

const degreeToRadian = (degree) => {
    return degree * Math.PI /180
}

const calculateAngleDegrees = (x, y)  => {
    return Math.atan2(y, x) * 180 / Math.PI;
}