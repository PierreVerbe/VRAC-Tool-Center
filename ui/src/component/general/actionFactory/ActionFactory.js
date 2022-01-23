import React from "react"
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography'

import { HomingAction } from "./action/HomingAction";
import { LineAction } from "./action/LineAction"

const ActionFactory = ({action}) => {
    switch (action) {
        case "Homing":
            return <HomingAction />;
        case "Line":
            return <LineAction />;
        case "Bottom Arms Out Double":
            return <p>Bottom Arms Out Double</p>;
        case "Bottom Arms In Double":
            return <p>Bottom Arms In Double</p>;
        case "Top Arms Get Samples":
            return <p>Top Arms Get Samples</p>;

        case "Top Arm Stockage":
            return <p>Top Arm Stockage</p>;
        case "XYT":
            return <p>XYT</p>;
        case "Top Arm Galery Bottom":
            return <p>Top Arm Galery Bottom</p>;
        case "Rotate":
            return <p>Rotate</p>;
        case "Single Arm Out":
            return <p>Single Arm Out</p>;

        case "Single Arm In":
            return <p>Single Arm In</p>;
        case "Top Arm Get Single Sample":
            return <p>Top Arm Get Single Sample</p>;
        case "Top Arm Buffer 1":
            return <p>Top Arm Buffer 1</p>;
        case "Top Arm Buffer 2":
            return <p>Top Arm Buffer 2</p>;
        case "Bezier":
            return <p>Bezier</p>;

        case "End":
            return <p>End</p>;
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
