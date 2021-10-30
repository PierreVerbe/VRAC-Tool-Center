import React from "react"
import { connect } from "react-redux"
import ReactJson from 'react-json-view'
import { DropzoneArea } from 'material-ui-dropzone'
import PropTypes from 'prop-types'

import Button from "@material-ui/core/Button"

//import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import DialogSaveMonitoring from "./DialogSaveMonitoring"
import { insertMonitoringActionCreator, deleteMonitoringActionCreator, setIdRowMonitoringTableActionCreator, setMonitoringActionCreator, setOpenDialogMonitoringActionCreator } from "../../../../../action/monitoringAction"

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
            <ReactJson src={monitoring} collapsed={1}/>
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

const SelectedMonitoring = ({deleteMonitoring, idRowMonitoringTable, monitoring, setIdRowMonitoringTable, setMonitoring, setOpenDialogMonitoring}) => {
    //const classes = useStyles()

    // Is button disabled
    const isSaveButtonDisabled = () => {
        return (idRowMonitoringTable !== null && idRowMonitoringTable !== -1)  || Object.entries(monitoring).length === 0
    }

    const isDeleteButtonDisabled = () => {
        return (idRowMonitoringTable === null || idRowMonitoringTable === -1) || Object.entries(monitoring).length === 0
    }

    const isExportButtonDisabled = () => {
        return Object.entries(monitoring).length === 0
    }

    const isClearButtonDisabled = () => {
        return Object.entries(monitoring).length === 0
    }

    // OnClick function for button
    const handleSave = () => {
        setOpenDialogMonitoring(true)
    }

    const handleDelete = () => {
        if (idRowMonitoringTable !== -1) {
            const body = {id: idRowMonitoringTable}
            deleteMonitoring(body)
            setIdRowMonitoringTable(null)
            setMonitoring({})
        }
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
    
    const handleClear = () => {
        setIdRowMonitoringTable(null)
        setMonitoring({})
    }

    return (
        <div>
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

            <DialogSaveMonitoring/>

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
    insertMonitoring: monitoringToInsert => dispatch(insertMonitoringActionCreator(monitoringToInsert)),
    deleteMonitoring: monitoringToDelete => dispatch(deleteMonitoringActionCreator(monitoringToDelete)),
    setMonitoring: monitoring => dispatch(setMonitoringActionCreator(monitoring)),
    setOpenDialogMonitoring: openDialogMonitoring => dispatch(setOpenDialogMonitoringActionCreator(openDialogMonitoring))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectedMonitoring)
