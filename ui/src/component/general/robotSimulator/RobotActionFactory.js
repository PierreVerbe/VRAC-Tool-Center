export const DEFAULT_ROBOT_X = -1000 // mm
export const DEFAULT_ROBOT_Y = -1000 // mm
export const DEFAULT_ROBOT_T = 0 // deg

export const TABLE_WIDTH = 3000 // mm
export const TABLE_HEIGHT = 2000 // mm

export const ROBOT_WIDTH = 320 // mm
export const ROBOT_HEIGHT = 220 // mm
export const ROBOT_DIAGONAL = Math.hypot(ROBOT_WIDTH, ROBOT_HEIGHT) // mm

export const REDUCING_FACTOR = 4

const outsideLine = 0x0000ff
const insideLine = 0x000000

export const RobotActionFactory = (robot, action) => {
    const actionType = action !== undefined ? action.type : undefined

    switch (actionType) {
        case 'Bezier':
            const xBezier = action.x / REDUCING_FACTOR
            const yBezier = action.y / REDUCING_FACTOR

            const radianBezier = degreeToRadian(- robot.angle)
            const xBezierRender = (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + robot.x
            const yBezierRender = (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + robot.y

            // Graphic rendering
            // Control point
            const angleBezier = - calculateAngleDegrees(xBezier - xBezierRender, yBezier - yBezierRender)

            // Bezier 1
            const radianBezier1 = degreeToRadian(-robot.angle - 90)
            const radianBezier11 = degreeToRadian(- angleBezier - 90)
            const bezierRenderStart1 = calculateRenderedPoint({ x: robot.x, y: robot.y }, radianBezier1)
            const bezierRenderStop1 = calculateRenderedPoint({ x: xBezier, y: yBezier }, radianBezier11)

            const xBezierRenderControlPoint1 =
                (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + bezierRenderStart1.x
            const yBezierRenderControlPoint1 =
                (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + bezierRenderStart1.y

            // Bezier 2
            const radianBezier2 = degreeToRadian(-robot.angle - 270)
            const radianBezier22 = degreeToRadian(-angleBezier - 270)
            const bezierRenderStart2 = calculateRenderedPoint({ x: robot.x, y: robot.y }, radianBezier2)
            const bezierRenderStop2 = calculateRenderedPoint({ x: xBezier, y: yBezier }, radianBezier22)

            const xBezierRenderControlPoint2 =
                (action.radius / REDUCING_FACTOR) * Math.cos(radianBezier) + bezierRenderStart2.x
            const yBezierRenderControlPoint2 =
                (action.radius / REDUCING_FACTOR) * Math.sin(radianBezier) + bezierRenderStart2.y

            const renderBezier = (g) => {
                g.clear()

                g.lineStyle(3, insideLine, 1)
                g.moveTo(robot.y, robot.x)
                g.bezierCurveTo(yBezierRender, xBezierRender, yBezier, xBezier, yBezier, xBezier) // Quadratic bezier, the 2 control points are the same

                g.lineStyle(3, outsideLine, 1)
                g.moveTo(bezierRenderStart1.y, bezierRenderStart1.x)
                g.bezierCurveTo(
                    yBezierRenderControlPoint1,
                    xBezierRenderControlPoint1,
                    bezierRenderStop1.y,
                    bezierRenderStop1.x,
                    bezierRenderStop1.y,
                    bezierRenderStop1.x
                ) // Quadratic bezier, the 2 control points are the same

                g.lineStyle(3, outsideLine, 1)
                g.moveTo(bezierRenderStart2.y, bezierRenderStart2.x)
                g.bezierCurveTo(
                    yBezierRenderControlPoint2,
                    xBezierRenderControlPoint2,
                    bezierRenderStop2.y,
                    bezierRenderStop2.x,
                    bezierRenderStop2.y,
                    bezierRenderStop2.x
                ) // Quadratic bezier, the 2 control points are the same

                g.endFill()
            }

            return { x: xBezier, y: yBezier, t: angleBezier, render: renderBezier }

        case 'Homing':
            // Axis: true -> Y
            // Axis: false -> X
            let thetaHoming = undefined
            let xHoming = undefined
            let yHoming = undefined
            let radianHoming1 = undefined
            let renderedHoming1 = undefined
            let radianHoming2 = undefined
            let renderedHoming2 = undefined

            if (action.axis) {
                thetaHoming = -270

                if (action.forward) {
                    xHoming = robot.x
                    yHoming = robot.y - (action.offset / REDUCING_FACTOR)
                }
                else {
                    xHoming = robot.x
                    yHoming = robot.y + (action.offset / REDUCING_FACTOR)
                }

                radianHoming1 = degreeToRadian(thetaHoming - 90)
                renderedHoming1 = calculateStartStopRenderedPoint(
                    { x: robot.x, y: robot.y },
                    { x: xHoming, y: yHoming },
                    radianHoming1
                )
                radianHoming2 = degreeToRadian(thetaHoming - 270)
                renderedHoming2 = calculateStartStopRenderedPoint(
                    { x: robot.x, y: robot.y },
                    { x: xHoming, y: yHoming },
                    radianHoming2
                )
            }
            else {
                thetaHoming = -180

                if (action.forward) {
                    xHoming = robot.x - (action.offset / REDUCING_FACTOR)
                    yHoming = robot.y
                }
                else {
                    xHoming = robot.x + (action.offset / REDUCING_FACTOR)
                    yHoming = robot.y
                }

                radianHoming1 = degreeToRadian(thetaHoming - 90)
                renderedHoming1 = calculateStartStopRenderedPoint(
                    { x: robot.x, y: robot.y },
                    { x: xHoming, y: yHoming },
                    radianHoming1
                )
                radianHoming2 = degreeToRadian(thetaHoming - 270)
                renderedHoming2 = calculateStartStopRenderedPoint(
                    { x: robot.x, y: robot.y },
                    { x: xHoming, y: yHoming },
                    radianHoming2
                )
            }

            const renderHoming = (g) => {
                g.clear()

                g.lineStyle(3, insideLine, 1)
                g.moveTo(robot.y, robot.x)
                g.lineTo(yHoming, xHoming)


                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedHoming1.start.y, renderedHoming1.start.x)
                g.lineTo(renderedHoming1.stop.y, renderedHoming1.stop.x)

                g.lineStyle(3, outsideLine, 1)
                g.moveTo(renderedHoming2.start.y, renderedHoming2.start.x)
                g.lineTo(renderedHoming2.stop.y, renderedHoming2.stop.x)

                g.endFill()
            }

            return { x: xHoming, y: yHoming, t: thetaHoming, render: renderHoming }

        case 'Line':
            const radianLine = action.forward ? degreeToRadian(-robot.angle) : degreeToRadian(-robot.angle - 180)
            const xLine = (action.distance / REDUCING_FACTOR) * Math.cos(radianLine) + robot.x
            const yLine = (action.distance / REDUCING_FACTOR) * Math.sin(radianLine) + robot.y

            // Graphic rendering
            const radianLine1 = degreeToRadian(-robot.angle - 90)
            const renderedLine1 = calculateStartStopRenderedPoint(
                { x: robot.x, y: robot.y },
                { x: xLine, y: yLine },
                radianLine1
            )
            const radianLine2 = degreeToRadian(-robot.angle - 270)
            const renderedLine2 = calculateStartStopRenderedPoint(
                { x: robot.x, y: robot.y },
                { x: xLine, y: yLine },
                radianLine2
            )

            const renderLine = (g) => {
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

            return { x: xLine, y: yLine, t: robot.angle, render: renderLine }

        case 'Rotate':
            const thetaRotate = action.relative ? robot.angle - action.theta : -action.theta

            const renderRotate = (g) => {
                g.clear()

                g.lineStyle(3, insideLine, 1)
                g.moveTo(robot.y, robot.x)
                g.drawCircle(robot.y, robot.x, 1 / REDUCING_FACTOR)

                g.lineStyle(3, outsideLine, 1)
                g.drawCircle(robot.y, robot.x, ROBOT_DIAGONAL / 2 / REDUCING_FACTOR)

                g.endFill()
            }

            return { x: robot.x, y: robot.y, t: thetaRotate, render: renderRotate }

        case 'SetOdometry':
            const xSetOdometry = action.x / REDUCING_FACTOR
            const ySetOdometry = action.y / REDUCING_FACTOR
            const tSetOdometry = -action.theta

            return { x: xSetOdometry, y: ySetOdometry, t: tSetOdometry }

        case 'XYT':
            const thetaXYT = -action.theta
            const xXYT = action.x / REDUCING_FACTOR
            const yXYT = action.y / REDUCING_FACTOR

            // Graphic rendering
            const radianXYTStart1 = degreeToRadian(-robot.angle - 270)
            const renderedXYT1 = calculateStartStopRenderedPoint({x: robot.x, y: robot.y}, {x: xXYT, y: yXYT}, radianXYTStart1)
            /*
            //const radianXYTStop1 = degreeToRadian(thetaXYT - 90)
            const renderedXYTStart1 = calculateRenderedPoint({ x: robot.x, y: robot.y }, radianXYTStart1)
            const renderedXYTStop1 = calculateRenderedPoint({ x: xXYT, y: yXYT }, radianXYTStart1)
            const renderedXYT1 = {
                start: { x: renderedXYTStart1.x, y: renderedXYTStart1.y },
                stop: { x: renderedXYTStop1.x, y: renderedXYTStop1.y },
            }
            */

            const radianXYTStart2 = degreeToRadian(-robot.angle - 90)
            const renderedXYT2 = calculateStartStopRenderedPoint({x: robot.x, y: robot.y}, {x: xXYT, y: yXYT}, radianXYTStart2)
            /*
            const radianXYTStop2 = degreeToRadian(thetaXYT - 270)
            const renderedXYTStart2 = calculateRenderedPoint({ x: robot.x, y: robot.y }, radianXYTStart2)
            const renderedXYTStop2 = calculateRenderedPoint({ x: xXYT, y: yXYT }, radianXYTStart2)
            const renderedXYT2 = {
                start: { x: renderedXYTStart2.x, y: renderedXYTStart2.y },
                stop: { x: renderedXYTStop2.x, y: renderedXYTStop2.y },
            }
            */

            const renderXYT = (g) => {
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
                g.drawCircle(action.y / REDUCING_FACTOR, action.x / REDUCING_FACTOR, 1 / 4)

                g.lineStyle(3, outsideLine, 1)
                g.lineStyle(3, outsideLine, 1)
                g.drawCircle(action.y / REDUCING_FACTOR, action.x / REDUCING_FACTOR, ROBOT_DIAGONAL / 2 / 4)

                g.endFill()
            }

            return { x: xXYT, y: yXYT, t: thetaXYT, render: renderXYT }

        default:
            return { x: robot.x, y: robot.y, t: robot.t }
    }
}

const degreeToRadian = (degree) => {
    return (degree * Math.PI) / 180
}

const calculateAngleDegrees = (x, y) => {
    return (Math.atan2(y, x) * 180) / Math.PI
}

const calculateRenderedPoint = (point, radian) => {
    const xRendered = (ROBOT_WIDTH / 2 / REDUCING_FACTOR) * Math.cos(radian) + point.x
    const yRendered = (ROBOT_WIDTH / 2 / REDUCING_FACTOR) * Math.sin(radian) + point.y

    return { x: xRendered, y: yRendered }
}

const calculateStartStopRenderedPoint = (start, stop, radian) => {
    const startRendered = calculateRenderedPoint(start, radian)
    const stopRendered = calculateRenderedPoint(stop, radian)

    return { start: startRendered, stop: stopRendered }
}
