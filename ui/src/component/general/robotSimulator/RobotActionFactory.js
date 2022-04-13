import PropTypes from "prop-types"

export const TABLE_WIDTH = 3000 //mm
export const TABLE_HEIGHT = 2000 //mm

export const ROBOT_WIDTH = 320 //mm
export const ROBOT_HEIGHT = 220 //mm

export const REDUCING_FACTOR = 4

export const RobotActionFactory = (robot, action) => {
    const actionType = action.type

    switch (actionType) {
        case "Bezier":
            console.log("je suis un bezier")
            console.log(robot)
            return 

        
        case "Homing":

            return

        case "Line":

            return

        case "Rotate":

            return 

        case "XYT":

            return 

        default:
            return
    }

}