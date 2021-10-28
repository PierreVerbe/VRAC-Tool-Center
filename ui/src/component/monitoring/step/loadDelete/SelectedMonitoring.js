import React from "react"
import ReactJson from 'react-json-view'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"
//import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp';
import ClearIcon from '@material-ui/icons/Clear';

import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

import { setIdRowMonitoringTableActionCreator, setMonitoringActionCreator } from "../../../../action/monitoringAction"

/*
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 500,
    },
  })
*/

const DropzoneOrReactJson = (props) => {
    const { isSelected, monitoring, setIdRowMonitoringTable, setMonitoring } = props

    const LoadJsonFile = (files) => {
        if (files.length > 0) {
            var file = files[0]
            var fileReader = new FileReader()
    
            fileReader.onload = function(progressEvent) {
                var stringData = progressEvent.target.result
                const obj = JSON.parse(stringData)
                setIdRowMonitoringTable(-1)
                setMonitoring(obj)
            }
            fileReader.readAsText(file, "UTF-8")
        }
    }
    
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
//const classes = useStyles()

const isSaveButtonDisabled = () => {
    return (idRowMonitoringTable !== null && idRowMonitoringTable !== -1)  || Object.entries(monitoring).length === 0
}

const handleSave = () => {
    console.log("save here")
}

const isDeleteButtonDisabled = () => {
    return (idRowMonitoringTable === null || idRowMonitoringTable === -1) || Object.entries(monitoring).length === 0
}

const handleDelete = () => {
    console.log("delete here")
}

const isExportButtonDisabled = () => {
    return Object.entries(monitoring).length === 0
}

const handleExport = async () => {
    const fileName = monitoring.name ? monitoring.name : "exported_file"
    const json = JSON.stringify(monitoring)
    const blob = new Blob([json], {type:'application/json'})
    const href = await URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = fileName + ".json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const isClearButtonDisabled = () => {
    return Object.entries(monitoring).length === 0
}

const handleClear = () => {
    setMonitoring({})
    setIdRowMonitoringTable(null)
}

    return (
        <div>
            <Typography > Id : {monitoring.id ? monitoring.id : "none"}</Typography>
            <Typography > Name : {monitoring.name ? monitoring.name : "none"}</Typography>
            <Typography > Date : {monitoring.date ? monitoring.date : "none"}</Typography>
            <Typography > Description : {monitoring.description ? monitoring.description : "none"}</Typography>
            <Typography > Version : {monitoring.version ? monitoring.version : "none"}</Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                //className={classes.button}
                startIcon={<SaveIcon />}
                style={{backgroundColor: "green"}}
                disabled={isSaveButtonDisabled()}
            >
                Save
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
                //className={classes.button}
                startIcon={<DeleteIcon />}
                style={{backgroundColor: "red"}}
                disabled={isDeleteButtonDisabled()}
            >
                Delete
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleExport}

                startIcon={<GetAppIcon />}
                //className={classes.button}
                style={{backgroundColor: "blue"}}
                disabled={isExportButtonDisabled()}
            >
                Export
            </Button>

            <DropzoneOrReactJson isSelected={idRowMonitoringTable !== null} monitoring={monitoring} setIdRowMonitoringTable={setIdRowMonitoringTable} setMonitoring={setMonitoring} />
        
            <Button
                variant="contained"
                color="primary"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                //className={classes.button}
                disabled={isClearButtonDisabled()}
                style={{backgroundColor: "orange"}}
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
