import PropTypes from "prop-types"
export const DEFAULT_ROBOT_X = -1000
export const DEFAULT_ROBOT_Y = -1000
export const DEFAULT_ROBOT_T = 0

export const TABLE_WIDTH = 3000 //mm
export const TABLE_HEIGHT = 2000 //mm

export const ROBOT_WIDTH = 320 //mm
export const ROBOT_HEIGHT = 220 //mm
export const ROBOT_DIAGONAL = Math.hypot(ROBOT_WIDTH, ROBOT_HEIGHT)

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
            const radianLine = action.forward ? degreeToRadian(- robot.angle) : degreeToRadian(robot.angle)
            const xLine = (action.distance / REDUCING_FACTOR) * Math.cos(radianLine) + robot.x
            const yLine = (action.distance / REDUCING_FACTOR) * Math.sin(radianLine) + robot.y

            // Graphic rendering
            const radianLine1 = degreeToRadian(-robot.angle - 90 )
            const renderedLine1 = calculateStartStopRenderedPoint({x: robot.x, y: robot.y}, {x: xLine, y: yLine}, radianLine1)
            const radianLine2 = degreeToRadian(-robot.angle - 270)
            const renderedLine2 = calculateStartStopRenderedPoint({x: robot.x, y: robot.y}, {x: xLine, y: yLine}, radianLine2)

            const renderLine = g => {
                g.clear()
                g.lineStyle(3, insideLine, 1)
               
                g.moveTo(robot.y, robot.x)
                g.lineTo(yLine, xLine)
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedLine1.start.y, renderedLine1.start.x)
                g.lineTo(renderedLine1.stop.y, renderedLine1.stop.x) 
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedLine2.start.y, renderedLine2.start.x)
                g.lineTo(renderedLine2.stop.y, renderedLine2.stop.x) 
        
                g.endFill()
              }
            
            return {x:xLine, y:yLine, t:robot.angle, render: renderLine}

        case "Rotate":
            const thetaRotate = action.relative ? robot.t - action.theta : - action.theta
        
            const renderRotate = g => {
                g.clear()
                g.lineStyle(3, insideLine, 1)
               
                g.moveTo(robot.y, robot.x)
                g.drawCircle(robot.y, robot.x, 1/REDUCING_FACTOR)
                
                g.lineStyle(3, outsideLine, 1)
                g.drawCircle(robot.y, robot.x, (ROBOT_DIAGONAL /2)/REDUCING_FACTOR)
                
                g.endFill()
              }

            return {x:robot.x, y:robot.y, t: thetaRotate, render: renderRotate}

        case "SetOdometry":
            const xSetOdometry = action.x/ REDUCING_FACTOR
            const ySetOdometry = action.y/ REDUCING_FACTOR
            const tSetOdometry = - action.theta

            return {x:xSetOdometry, y:ySetOdometry, t: tSetOdometry}

        case "XYT":
            const thetaXYT = - action.theta
            const xXYT = action.x/REDUCING_FACTOR
            const yXYT = action.y/REDUCING_FACTOR

            // Graphic rendering
            const radianXYTStart1 = degreeToRadian(-robot.angle - 270)
            const radianXYTStop1 = degreeToRadian(thetaXYT - 90)
            const renderedXYTStart1 = calculateRenderedPoint({x: robot.x, y: robot.y}, radianXYTStart1)
            const renderedXYTStop1 = calculateRenderedPoint({x: xXYT, y: yXYT}, radianXYTStop1)
            const renderedXYT1 = {start: {x:renderedXYTStart1.x, y: renderedXYTStart1.y}, stop:{x: renderedXYTStop1.x, y:renderedXYTStop1.y}}

            const radianXYTStart2 = degreeToRadian(-robot.angle - 90)
            const radianXYTStop2 = degreeToRadian(thetaXYT - 270)
            const renderedXYTStart2 = calculateRenderedPoint({x: robot.x, y: robot.y}, radianXYTStart2)
            const renderedXYTStop2 = calculateRenderedPoint({x: xXYT, y: yXYT}, radianXYTStop2)
            const renderedXYT2 = {start: {x:renderedXYTStart2.x, y: renderedXYTStart2.y}, stop:{x: renderedXYTStop2.x, y:renderedXYTStop2.y}}

            const renderXYT = g => {
                g.clear()
                g.lineStyle(3, insideLine, 1)

                g.moveTo(robot.y, robot.x)
                g.lineTo(yXYT, xXYT)
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedXYT1.start.y, renderedXYT1.start.x)
                g.lineTo(renderedXYT1.stop.y, renderedXYT1.stop.x) 
                
                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedXYT2.start.y, renderedXYT2.start.x)
                g.lineTo(renderedXYT2.stop.y, renderedXYT2.stop.x) 
               
                g.lineStyle(3, insideLine, 1)
                g.moveTo(action.x, action.y)
                g.drawCircle(action.y/REDUCING_FACTOR, action.x /REDUCING_FACTOR , 1/4)
                
                g.lineStyle(3, outsideLine, 1)
                g.lineStyle(3, outsideLine, 1)
                g.drawCircle(action.y/REDUCING_FACTOR, action.x/REDUCING_FACTOR,  (ROBOT_DIAGONAL /2)/4)
             
                g.endFill()
              }
            
            return {x:xXYT, y:yXYT, t:thetaXYT, render: renderXYT}

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

const calculateRenderedPoint = (point, radian) => {
    const xRendered = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.cos(radian) + point.x
    const yRendered = ((ROBOT_WIDTH /2) / REDUCING_FACTOR) * Math.sin(radian) + point.y

    return {x: xRendered, y: yRendered}
}

const calculateStartStopRenderedPoint = (start, stop, radian) => {
    const startRendered = calculateRenderedPoint(start, radian)
    const stopRendered = calculateRenderedPoint(stop, radian)

    return {start: startRendered, stop: stopRendered}
}