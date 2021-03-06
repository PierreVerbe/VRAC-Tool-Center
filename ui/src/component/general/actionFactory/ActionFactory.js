import React from "react"
import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"

import BackGrippersDropCenterAction from "./action/BackGrippersDropCenterAction"
import BackGrippersDropLeftAction from "./action/BackGrippersDropLeftAction"
import BackGrippersDropRightAction from "./action/BackGrippersDropRightAction"
import BackGrippersGrabCenterAction from "./action/BackGrippersGrabCenterAction"
import BackGrippersGrabLeftAction from "./action/BackGrippersGrabLeftAction"
import BackGrippersGrabRightAction from "./action/BackGrippersGrabRightAction"
import BackGrippersInAction from "./action/BackGrippersInAction"
import BackGrippersOutAction from "./action/BackGrippersOutAction"
import BezierAction from "./action/BezierAction"
import BottomArmsInDoubleAction from "./action/BottomArmsInDoubleAction"
import BottomArmsInSingleAction from "./action/BottomArmsInSingleAction"
import BottomArmsOutDoubleAction from "./action/BottomArmsOutDoubleAction"
import BottomArmsOutSingleAction from "./action/BottomArmsOutSingleAction"
import CalculateOdometryAction from "./action/CalculateOdometryAction"
import EndAction from "./action/EndAction"
import HomingAction from "./action/HomingAction"
import LineAction from "./action/LineAction"
import RotateAction from "./action/RotateAction"
import TopArmGaleryBottomAction from "./action/TopArmGaleryBottomAction"
import TopArmGaleryTopAction from "./action/TopArmGaleryTopAction"
import TopArmGetSamplesAction from "./action/TopArmGetSamplesAction"
import TopArmGetSingleSampleAction from "./action/TopArmGetSingleSampleAction"
import TopArmSingleStockageAction from "./action/TopArmSingleStockageAction"
import TopArmStockageAction from "./action/TopArmStockageAction"
import WaitAction from "./action/WaitAction"
import XYTAction from "./action/XYTAction"

const ActionFactory = ({ action }) => {
    const actionType = action.actionData.type

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

        case "BackGrippersGrabRight":
            return <BackGrippersGrabRightAction action={action} />

        case "BackGrippersIn":
            return <BackGrippersInAction action={action} />

        case "BackGrippersOut":
            return <BackGrippersOutAction action={action} />

        case "Bezier":
            return <BezierAction action={action} />

        case "BottomArmsInDouble":
            return <BottomArmsInDoubleAction action={action} />

        case "BottomArmsInSingle":
            return <BottomArmsInSingleAction action={action} />

        case "BottomArmsOutDouble":
            return <BottomArmsOutDoubleAction action={action} />

        case "BottomArmsOutSingle":
            return <BottomArmsOutSingleAction action={action} />

        case "CalculateOdometry":
            return <CalculateOdometryAction action={action} />

        case "End":
            return <EndAction action={action} />

        case "Homing":
            return <HomingAction action={action} />

        case "Line":
            return <LineAction action={action} />

        case "Rotate":
            return <RotateAction action={action} />

        case "TopArmGaleryBottom":
            return <TopArmGaleryBottomAction action={action} />

        case "TopArmGaleryTop":
            return <TopArmGaleryTopAction action={action} />

        case "TopArmGetSamples":
            return <TopArmGetSamplesAction action={action} />

        case "TopArmGetSingleSample":
            return <TopArmGetSingleSampleAction action={action} />

        case "TopArmSingleStockage":
            return <TopArmSingleStockageAction action={action} />

        case "TopArmStockage":
            return <TopArmStockageAction action={action} />

        case "Wait":
            return <WaitAction action={action} />
        
        case "XYT":
            return <XYTAction action={action} />   

        default:
            return <Typography>Action type undefined</Typography>
    }
}

ActionFactory.propTypes = {
    action: PropTypes.string
}

export default ActionFactory
