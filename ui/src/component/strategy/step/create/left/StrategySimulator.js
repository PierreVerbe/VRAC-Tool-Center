import React from "react"
import { connect } from "react-redux"

import Button from '@material-ui/core/Button';
import parserStrategy from '../../../../../util/parserStrategy';

const StrategySimulator = ({strategyCreator, metaActionArray}) => {
    const handleParser = () => {
        const contentParser = parserStrategy.parse(strategyCreator, metaActionArray)
        console.log(contentParser)
    }

    return (
        <div >
            <p>Simulator here</p>
            <Button variant="contained"
            onClick={handleParser}
            >
                Get Strategy
            </Button>
        </div>
    )
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray
})

export default connect(mapStateToProps)(StrategySimulator)