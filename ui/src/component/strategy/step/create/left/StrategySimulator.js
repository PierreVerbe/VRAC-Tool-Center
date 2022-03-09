import React from "react"
import { connect } from "react-redux"

import * as JSZip from 'jszip'
import { saveAs } from 'file-saver';

import Button from '@material-ui/core/Button';
import parserStrategy from '../../../../../util/parserStrategy';
import RobotSimulator from "./../../../../general/robotSimulator/RobotSimulator"

const StrategySimulator = ({strategyCreator, metaActionArray}) => {
    const handleParser = () => {
        const contentParser = parserStrategy.parse(strategyCreator, metaActionArray)
        console.log(contentParser)

        var zip = new JSZip();
        zip.file("strategy.json", JSON.stringify(contentParser.strategy, null, ' '))
        contentParser.metaActions.forEach(metaAction => {
            zip.file(metaAction.name + ".json", JSON.stringify(metaAction, null, ' '));
        });
        
        zip.generateAsync({type:"blob"})
        .then(function(content) {
        // see FileSaver.js
        saveAs(content, contentParser.strategy.name + ".zip");
});
    }

    return (
        <div >
            <p>Simulator here</p>
            <Button variant="contained"
            onClick={handleParser}
            >
                Get Strategy
            </Button>

            <RobotSimulator />
        </div>
    )
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray
})

export default connect(mapStateToProps)(StrategySimulator)