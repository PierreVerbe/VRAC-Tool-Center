import React from "react"
import ReactJson from 'react-json-view'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'

import { setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "./../../../../action/monitoringAction"

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
    },
  })

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
                const obj = JSON.parse(stringData)
                console.log(stringData);
                setIdRowMonitoringTable(-1)
                setMonitoring(obj)
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

//const classes = useStyles()

const handleClear = () => {
    if (monitoring !== {}) {
        setMonitoring({})
    }
    if (idRowMonitoringTable !== null) {
        setIdRowMonitoringTable(null)
    }
}

    return (
        <div>
            <p>Simulation section</p>
            <DropzoneOrReactJson isSelected={idRowMonitoringTable !== null} monitoring={monitoring} setIdRowMonitoringTable={setIdRowMonitoringTable} setMonitoring={setMonitoring} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleClear}
                //className={classes.button}
            >
            Clear
            </Button>
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
