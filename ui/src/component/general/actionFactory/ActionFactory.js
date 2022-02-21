import React from "react"
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography'

import HomingAction from "./action/HomingAction"
import LineAction  from "./action/LineAction"
import BottomArmsOutDoubleAction from "./action/BottomArmsOutDoubleAction";
import BottomArmsInDoubleAction from "./action/BottomArmsInDoubleAction";
import TopArmsGetSamplesAction from "./action/TopArmsGetSamplesAction";
import TopArmStockageAction from "./action/TopArmStockageAction";
import XYTAction from "./action/XYTAction";
import RotateAction from "./action/RotateAction";


import TopArmGaleryBottomAction from "./action/TopArmGaleryBottomAction";

import EndAction from "./action/EndAction";
import SingleArmOutAction from "./action/SingleArmOutAction";
import SingleArmInAction from "./action/SingleArmInAction";
import TopArmGetSingleSampleAction from "./action/TopArmGetSingleSampleAction";
import TopArmBuffer1Action from "./action/TopArmBuffer1Action";
import TopArmBuffer2Action from "./action/TopArmBuffer2Action";
import BezierAction from "./action/BezierAction";

const ActionFactory = ({action}) => {
    const actionType = action.actionData.type

    switch (actionType) {
        case "Homing":
            return <HomingAction action={action}/>;
        case "Line":
            return <LineAction action={action}/>;
        case "Bottom Arms Out Double":
            return <BottomArmsOutDoubleAction action={action}/>;
        case "Bottom Arms In Double":
            return <BottomArmsInDoubleAction action={action}/>;
        case "Top Arms Get Samples":
            return <TopArmsGetSamplesAction action={action}/>; 
        case "Top Arm Stockage":
            return <TopArmStockageAction action={action}/>;
        case "XYT":
            return <XYTAction action={action}/>; 
        case "Top Arm Galery Bottom":
            return <TopArmGaleryBottomAction action={action}/>;
        case "Rotate":
            return <RotateAction action={action}/>;
        case "Single Arm Out":
            return <SingleArmOutAction action={action}/>;

        case "Single Arm In":
            return <SingleArmInAction action={action}/>;
        case "Top Arm Get Single Sample":
            return <TopArmGetSingleSampleAction action={action}/>;
        case "Top Arm Buffer 1":
            return <TopArmBuffer1Action action={action}/>;
        case "Top Arm Buffer 2":
            return <TopArmBuffer2Action action={action}/>;
        case "Bezier":
            return <BezierAction action={action}/>;

        case "End":
            return <EndAction action={action}/>;
        default:
            return <Typography>Action type undefined</Typography>;
    }
}

ActionFactory.propTypes = { 
    action: PropTypes.string
};

/*
const areEqual = (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  };
  */

//  const Acached = React.memo(A, areEqual);

// https://blog.bitsrc.io/react-js-with-factory-pattern-building-complex-ui-with-ease-fe6db29ab1c1


export default ActionFactory
