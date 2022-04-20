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
            console.log("Bezier")
            console.log(robot)
            console.log()

            //const thetaXYT = - action.theta
            const xBezier = action.x/REDUCING_FACTOR
            const yBezier = action.y/REDUCING_FACTOR

            const radianBezier = degreeToRadian(robot.angle + 90)
            const xBezierRender = (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + robot.x
            const yBezierRender = (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + robot.y
            
            /*angle point controle et arrivee */
            const angleBezier = calculateAngleDegrees(xBezier - xBezierRender ,  yBezier- yBezierRender ) + 90
            
            console.log("angleBezier")
            console.log(angleBezier)

            //outside 1
            const radianBezier2 = degreeToRadian(robot.angle )
            const radianBezier22 = degreeToRadian(angleBezier)

            const xBezierRenderInitial2 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.cos(radianBezier2) + robot.x
            const yBezierRenderInitial2 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.sin(radianBezier2) + robot.y

            const xBezierRenderArrival2 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.cos(radianBezier22) + xBezier
            const yBezierRenderArrival2 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.sin(radianBezier22) + yBezier

            const xBezierRenderControlPoint2 = (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + xBezierRenderInitial2
            const yBezierRenderControlPoint2 = (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + yBezierRenderInitial2

            // outside line 2
            const radianBezier1 = degreeToRadian(robot.angle + 90 + 90)
            const radianBezier11 = degreeToRadian(angleBezier + 90 + 90)

            const xBezierRenderInitial1 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.cos(radianBezier1) + robot.x
            const yBezierRenderInitial1 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.sin(radianBezier1) + robot.y

            const xBezierRenderArrival1 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.cos(radianBezier11) + xBezier
            const yBezierRenderArrival1 = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.sin(radianBezier11) + yBezier

            const xBezierRenderControlPoint1 = (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + xBezierRenderInitial1
            const yBezierRenderControlPoint1 = (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + yBezierRenderInitial1
            //const xBezierRender11 = (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + xBezierRenderInitial1
            //const yBezierRender11 = (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + yBezierRenderInitial1
            

            


            const renderBezier = g => {
                g.clear()
                g.lineStyle(3, insideLine, 1)
               
                g.moveTo(robot.x, robot.y)
                g.bezierCurveTo(xBezierRender, yBezierRender, xBezierRender, yBezierRender, yBezier, xBezier) // pts de controles les mêmes == quadratique
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(xBezierRenderInitial1, yBezierRenderInitial1)
                g.bezierCurveTo(xBezierRenderControlPoint1, yBezierRenderControlPoint1, xBezierRenderControlPoint1, yBezierRenderControlPoint1, yBezierRenderArrival1, xBezierRenderArrival1) // pts de controles les mêmes == quadratique
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(xBezierRenderInitial2, yBezierRenderInitial2)
                g.bezierCurveTo(xBezierRenderControlPoint2, yBezierRenderControlPoint2, xBezierRenderControlPoint2, yBezierRenderControlPoint2, yBezierRenderArrival2, xBezierRenderArrival2) // pts de controles les mêmes == quadratique
                
                g.endFill()
              }
            
            return {x:xBezier, y:yBezier, t:angleBezier, render: renderBezier}
        
        case "Homing":

            return

        case "Line":
            const radianLine = action.forward ? degreeToRadian(robot.angle +90) : degreeToRadian(robot.angle + 270)
            const xLine = (action.distance / REDUCING_FACTOR) * Math.cos(radianLine) + robot.x
            const yLine = (action.distance / REDUCING_FACTOR) * Math.sin(radianLine) + robot.y

            const renderLine = g => {
                g.clear()
                g.lineStyle(3, 0x000000, 1)
               
                g.moveTo(700/4, 700/4)
                g.bezierCurveTo(600/4, 400/4, 600/4, 400/4, 1800/4, 450/4) // pts de controles les mêmes == quadratique
                
                g.lineStyle(3, 0x0000FF, 1)
                g.moveTo((700 + 200)/4, 700/4)
                g.bezierCurveTo(800/4, 600/4, 800/4, 600/4, 1800 /4, (450 +200 )/4) // pts de controles les mêmes == quadratique
                
                g.lineStyle(3, 0x0000FF, 1)
                g.moveTo((700 - 200)/4, 700/4)
                g.bezierCurveTo(400/4, 200/4, 400/4, 200/4, 1800/4, (450 - 200)/4) // pts de controles les mêmes == quadratique
                
        
                g.endFill()
              }
            
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