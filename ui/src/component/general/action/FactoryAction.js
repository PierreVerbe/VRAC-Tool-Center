import React from "react"
import PropTypes from 'prop-types';

export const FactoryAction = (props) => {
    switch (props.component.action) {
        case "Homing":
            return <A />;
        case "Line":
            return <B />;
        case "Top arm get storage":
            return <C />;
        case "XYT":
            return <D />;
        case "End":
            return <E />;
      default:
        return <div>Reload...</div>;
    }
}

FactoryAction.propTypes = { action: PropTypes.string};


function A() {
console.log("Rendered A");
return <div>A</div>;
}

function B() {
console.log("Rendered B");
return <div>B</div>;
}

function C() {
console.log("Rendered C");
return <div>C</div>;
}

function D() {
    console.log("Rendered D");
    return <div>D</div>;
    }
    
    function E() {
    console.log("Rendered E");
    return <div>E</div>;
    }

const areEqual = (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  };
  const Acached = React.memo(A, areEqual);

// https://blog.bitsrc.io/react-js-with-factory-pattern-building-complex-ui-with-ease-fe6db29ab1c1



