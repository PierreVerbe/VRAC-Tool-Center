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
        case "Top arm get storage":
            return <p>Top arm get storage</p>;
        case "XYT":
            return <p>XYT</p>;
        case "End":
            return <p>End</p>;
      default:
        return <Typography>Please select action</Typography>;
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
