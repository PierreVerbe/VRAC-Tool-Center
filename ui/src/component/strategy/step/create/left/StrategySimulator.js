import React from "react"
import { connect } from "react-redux"

import * as JSZip from 'jszip'
import { saveAs } from 'file-saver'

import Button from '@material-ui/core/Button'
import parserGraph from './../../../../../utils/parserGraph'
import RobotSimulator from "./../../../../general/robotSimulator/RobotSimulator"

import { setStrategyCreatorActionCreator, setMetaActionArrayActionCreator } from "./../../../../../action/strategyAction"

const StrategySimulator = ({ strategyCreator, setStrategyCreator, metaActionArray,setMetaActionArray }) => {
    const handleParseStrategy = () => {
        const contentParser = parserGraph.parse(strategyCreator, metaActionArray)

        var zip = new JSZip()
        zip.file("strategy.json", JSON.stringify(contentParser.strategy, null, ' '))
        contentParser.metaActions.forEach(metaAction => {
            zip.file(metaAction.name + ".json", JSON.stringify(metaAction, null, ' '))
        })

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, contentParser.strategy.name + ".zip")
            })
    }

    const handleClearStrategy = () => {
        setStrategyCreator({...strategyCreator, name: "Strategy name", flow: []})
        setMetaActionArray([])
    }

    return (
        <div >
            <Button variant="contained" onClick={handleParseStrategy}>
                Get Strategy
            </Button>

            <Button variant="contained" onClick={handleClearStrategy}>
                Clear Strategy
            </Button>

            <RobotSimulator />
        </div>
    )
}

const mapStateToProps = state => ({
    strategyCreator: state.strategyCreator,
    metaActionArray: state.metaActionArray
})

const mapDispatchToProps = dispatch => ({
    setStrategyCreator: strategyCreator => dispatch(setStrategyCreatorActionCreator(strategyCreator)),
    setMetaActionArray: metaActionArray => dispatch(setMetaActionArrayActionCreator(metaActionArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategySimulator)
