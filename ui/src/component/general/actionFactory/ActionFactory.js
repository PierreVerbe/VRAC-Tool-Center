import React from "react"
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import BackGrippersDropCenterAction from "./action/BackGrippersDropCenterAction"
import BackGrippersDropLeftAction from "./action/BackGrippersDropLeftAction"
import BackGrippersDropRightAction from "./action/BackGrippersDropRightAction"
import BackGrippersGrabCenterAction from "./action/BackGrippersGrabCenterAction"
import BackGrippersGrabLeftAction from "./action/BackGrippersGrabLeftAction"



import BezierAction from "./action/BezierAction"
import BottomArmsInDoubleAction from "./action/BottomArmsInDoubleAction"
import BottomArmsOutDoubleAction from "./action/BottomArmsOutDoubleAction"
import EndAction from "./action/EndAction"
import HomingAction from "./action/HomingAction"
import LineAction from "./action/LineAction"
import RotateAction from "./action/RotateAction"
import SingleArmInAction from "./action/SingleArmInAction"
import SingleArmOutAction from "./action/SingleArmOutAction"
import TopArmBuffer1Action from "./action/TopArmBuffer1Action"
import TopArmBuffer2Action from "./action/TopArmBuffer2Action"
import TopArmGaleryBottomAction from "./action/TopArmGaleryBottomAction"
import TopArmGetSingleSampleAction from "./action/TopArmGetSingleSampleAction"
import TopArmsGetSamplesAction from "./action/TopArmsGetSamplesAction"
import TopArmStockageAction from "./action/TopArmStockageAction"
import XYTAction from "./action/XYTAction"

const ActionFactory = ({ action }) => {
    const actionType = action.actionData.type

    /*
    const metaActionActionType = [
    "BackGrippersDropCenter", "BackGrippersDropLeft", "BackGrippersDropRight", "BackGrippersGrabCenter", "BackGrippersGrabLeft",
    "BackGrippersGrabRight", "BackGrippersIn", "BackGrippersOut", "Bezier", "BottomArmsIn_double",
    "BottomArmsIn_single", "BottomArmsOut_double", "BottomArmsOut_single", "CalculateOdo", "End",
    "Homing", "Line", "Rotate", "TopArmGaleryBottom", "TopArmGaleryTop",
    "TopArmGetSamples", "TopArmGetSingleSample", "TopArmSingleStockage", "TopArmStockage", "Wait",
    "XYT"
]
*/
    switch (actionType) {
        case "BackGrippersDropCenter":
            return <BackGrippersDropCenterAction action={action} />

        case "BackGrippersDropLeft":
            return <BackGrippersDropLeftAction action={action} />

        case "BackGrippersDropRight":
            return <BackGrippersDropRightAction action={action} />

        case "BackGrippersGrabCenter":
            return <BackGrippersGrabCenterAction action={action} />

        case "BackGrippersGrabLeft":
            return <BackGrippersGrabLeftAction action={action} />


            

        case "Homing":
            return <HomingAction action={action} />

        case "Line":
            return <LineAction action={action} />

        case "BottomArmsOutDouble":
            return <BottomArmsOutDoubleAction action={action} />

        case "BottomArmsInDouble":
            return <BottomArmsInDoubleAction action={action} />

        case "TopArmsGetSamples":
            return <TopArmsGetSamplesAction action={action} />

        case "TopArmStockage":
            return <TopArmStockageAction action={action} />

        case "XYT":
            return <XYTAction action={action} />

        case "TopArmGaleryBottom":
            return <TopArmGaleryBottomAction action={action} />

        case "Rotate":
            return <RotateAction action={action} />

        case "SingleArmOut":
            return <SingleArmOutAction action={action} />

        case "SingleArmIn":
            return <SingleArmInAction action={action} />

        case "TopArmGetSingleSample":
            return <TopArmGetSingleSampleAction action={action} />

        case "TopArmBuffer1":
            return <TopArmBuffer1Action action={action} />

        case "TopArmBuffer2":
            return <TopArmBuffer2Action action={action} />

        case "Bezier":
            return <BezierAction action={action} />

        case "End":
            return <EndAction action={action} />

        default:
            return <Typography>Action type undefined</Typography>
    }
}

ActionFactory.propTypes = {
    action: PropTypes.string
}

export default ActionFactory
