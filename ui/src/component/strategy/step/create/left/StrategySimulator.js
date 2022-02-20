import React from "react"
import { connect } from "react-redux"

import * as JSZip from 'jszip'
import { saveAs } from 'file-saver';

import Button from '@material-ui/core/Button';
import parserStrategy from '../../../../../util/parserStrategy';

const StrategySimulator = ({strategyCreator, metaActionArray}) => {
    const handleParser = () => {
        const contentParser = parserStrategy.parse(strategyCreator, metaActionArray)
        console.log(contentParser)

        var zip = new JSZip();
        zip.file("strategy.json", JSON.stringify(contentParser.strategy, null, ' '))
        contentParser.meta.forEach(element => {
            zip.file(element.MetaActionName + ".json", JSON.stringify(element, null, ' '));
        });
        
        zip.generateAsync({type:"blob"})
        .then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
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
        </div>
    )
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray
})

export default connect(mapStateToProps)(StrategySimulator)