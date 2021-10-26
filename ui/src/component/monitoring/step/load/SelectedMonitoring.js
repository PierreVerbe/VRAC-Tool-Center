import React from "react"
import ReactJson from 'react-json-view'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import {DropzoneArea} from 'material-ui-dropzone'

import { setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "./../../../../action/monitoringAction"



const DropzoneOrReactJson = (props) => {
    const { isSelected, monitoring, setIdRowMonitoringTable, setMonitoring } = props

    const LoadJsonFile = (files) => {
    
        console.log("setIdRowMonitoringTable 2")
        //console.log(truc)
        //console.log(ff)
        if (files.length > 0) {
            var file = files[0]
            var fileReader = new FileReader()
    
            fileReader.onload = function(progressEvent) {
                var stringData = progressEvent.target.result;
                console.log(stringData);
                setIdRowMonitoringTable(-1)
                setMonitoring(stringData)
            }
            fileReader.readAsText(file, "UTF-8")
        }
    }

    console.log("setIdRowMonitoringTable")
    console.log(setIdRowMonitoringTable)
    console.log(monitoring)
    
    setIdRowMonitoringTable.bind(this)
    if (isSelected === false) {
        return <DropzoneArea onChange={LoadJsonFile.bind(this)}/>
    }
    else {
       return (
           <div>
            <p>UN truc</p>
            <ReactJson src={monitoring} />
           </div>
       )
   }
}

DropzoneOrReactJson.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    monitoring: PropTypes.object.isRequired,
    setIdRowMonitoringTable: PropTypes.func.isRequired,
    setMonitoring: PropTypes.func.isRequired
  }

const SelectedMonitoring = ({idRowMonitoringTable, monitoring, setIdRowMonitoringTable, setMonitoring}) => {
console.log(idRowMonitoringTable)

    return (
        <div>
            <p>Simulation section</p>
            <DropzoneOrReactJson isSelected={idRowMonitoringTable !== null} monitoring={monitoring} setIdRowMonitoringTable={setIdRowMonitoringTable} setMonitoring={setMonitoring} />
        </div>
    )
}

const mapStateToProps = state => ({
    idRowMonitoringTable: state.idRowMonitoringTable,
    monitoring: state.monitoring
})
  
const mapDispatchToProps = dispatch => ({
    setIdRowMonitoringTable: idRowMonitoringTable => dispatch(setIdRowMonitoringTableActionCreator(idRowMonitoringTable)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectedMonitoring)
